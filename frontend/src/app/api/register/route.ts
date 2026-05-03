import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { hashPassword } from "@/lib/password";

type RegisterBody = {
  name?: string;
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  const { name, email, password } = (await request.json()) as RegisterBody;
  const normalizedName = name?.trim() || "";
  const normalizedEmail = email?.trim().toLowerCase() || "";

  if (!normalizedName) {
    return NextResponse.json({ message: "Name is required." }, { status: 400 });
  }

  if (!normalizedEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 });
  }

  if (!password || password.length < 6) {
    return NextResponse.json({ message: "Password must be at least 6 characters." }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();
  const users = db.collection("users");
  const existingUser = await users.findOne<{ passwordHash?: string }>({ email: normalizedEmail });

  if (existingUser) {
    return NextResponse.json(
      {
        message: existingUser.passwordHash
          ? "An account with this email already exists."
          : "This email is already linked to Google sign-in. Please use Google login.",
      },
      { status: 409 }
    );
  }

  const passwordHash = await hashPassword(password);
  await users.insertOne({
    name: normalizedName,
    email: normalizedEmail,
    passwordHash,
    image: null,
    emailVerified: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return NextResponse.json({ message: "Account created successfully." });
}

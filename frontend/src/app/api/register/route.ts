import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { hashPassword } from "@/lib/password";
import { z } from "zod";

/** Zod schema for the registration request body */
const RegisterSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(100, "Name is too long."),
  email: z.string().trim().email("Enter a valid email address.").toLowerCase(),
  password: z.string().min(6, "Password must be at least 6 characters.").max(128, "Password is too long."),
});

/**
 * POST /api/register
 * Creates a new credentials-based account.
 * Blocks attaching a password to an existing Google-auth account (account takeover prevention).
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = RegisterSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error?.errors?.[0];
    return NextResponse.json({ message: firstError?.message ?? "Invalid request data." }, { status: 400 });
  }

  const { name, email, password } = parsed.data;

  const client = await clientPromise;
  const db = client.db();
  const users = db.collection<{ passwordHash?: string; email: string }>("users");
  const existingUser = await users.findOne({ email });

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
    name,
    email,
    passwordHash,
    image: null,
    emailVerified: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Parameters<typeof users.insertOne>[0]);

  return NextResponse.json({ message: "Account created successfully." }, { status: 201 });
}

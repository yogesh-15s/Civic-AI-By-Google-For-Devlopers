import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { authOptions, getSessionUserQuery } from "@/lib/auth";

type ProfileUpdateBody = {
  age?: string;
  state?: string;
  city?: string;
  firstTimeVoter?: "yes" | "no";
};

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const query = getSessionUserQuery(session);

  if (!query) {
    return NextResponse.json({ message: "Session is missing a user identifier." }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();
  const user = await db.collection("users").findOne(query, {
    projection: {
      name: 1,
      email: 1,
      image: 1,
      age: 1,
      state: 1,
      city: 1,
      firstTimeVoter: 1,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found." }, { status: 404 });
  }

  return NextResponse.json({
    user: {
      name: user.name ?? "",
      email: user.email ?? "",
      image: user.image ?? "",
      age: user.age ?? "",
      state: user.state ?? "",
      city: user.city ?? "",
      firstTimeVoter: user.firstTimeVoter ?? "",
    },
  });
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const query = getSessionUserQuery(session);

  if (!query) {
    return NextResponse.json({ message: "Session is missing a user identifier." }, { status: 400 });
  }

  const { age, state, city, firstTimeVoter } = (await request.json()) as ProfileUpdateBody;

  if (!age || Number(age) < 18) {
    return NextResponse.json({ message: "Age must be 18 or above." }, { status: 400 });
  }

  if (!state?.trim() || !city?.trim()) {
    return NextResponse.json({ message: "State and city are required." }, { status: 400 });
  }

  if (firstTimeVoter !== "yes" && firstTimeVoter !== "no") {
    return NextResponse.json({ message: "Choose whether you are a first-time voter." }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();
  await db.collection("users").updateOne(
    query,
    {
      $set: {
        age,
        state: state.trim(),
        city: city.trim(),
        firstTimeVoter,
        updatedAt: new Date(),
      },
    }
  );

  return GET();
}

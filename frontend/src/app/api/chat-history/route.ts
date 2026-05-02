import { getServerSession, type Session } from "next-auth";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
};

type ChatBody = {
  messages?: ChatMessage[];
  language?: "en" | "hi";
};

function getIdentity(session: Session | null) {
  const userId = session?.user?.id;
  const email = session?.user?.email?.toLowerCase();

  if (!userId || !email) {
    return null;
  }

  return { userId, email };
}

export async function GET() {
  const session = await getServerSession(authOptions);
  const identity = getIdentity(session);

  if (!identity) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db();
  const chat = await db.collection("chat_histories").findOne({ userId: identity.userId });

  return NextResponse.json({
    messages: Array.isArray(chat?.messages) ? chat.messages : [],
    language: chat?.language === "hi" ? "hi" : "en",
  });
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  const identity = getIdentity(session);

  if (!identity) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { messages, language } = (await request.json()) as ChatBody;

  if (!Array.isArray(messages)) {
    return NextResponse.json({ message: "Messages must be an array." }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();
  await db.collection("chat_histories").updateOne(
    { userId: identity.userId },
    {
      $set: {
        userId: identity.userId,
        email: identity.email,
        messages,
        language: language === "hi" ? "hi" : "en",
        updatedAt: new Date(),
      },
      $setOnInsert: {
        createdAt: new Date(),
      },
    },
    { upsert: true }
  );

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const session = await getServerSession(authOptions);
  const identity = getIdentity(session);

  if (!identity) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db();
  await db.collection("chat_histories").deleteOne({ userId: identity.userId });

  return NextResponse.json({ ok: true });
}

import type { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { verifyPassword } from "@/lib/password";

type StoredUser = {
  _id: ObjectId;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  passwordHash?: string;
  age?: string;
  state?: string;
  city?: string;
  firstTimeVoter?: "yes" | "no";
};

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password ?? "";

        if (!email || !password) {
          return null;
        }

        const client = await clientPromise;
        const db = client.db();
        const user = await db.collection<StoredUser>("users").findOne({ email });

        if (!user?.passwordHash) {
          return null;
        }

        const isValid = await verifyPassword(password, user.passwordHash);

        if (!isValid) {
          return null;
        }

        return {
          id: user._id.toString(),
          email: user.email ?? undefined,
          name: user.name ?? undefined,
          image: user.image ?? undefined,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token.userId = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.userId) {
        session.user.id = token.userId;
      }

      return session;
    },
  },
};

export function getSessionUserQuery(session: Session): { _id: ObjectId } | { email: string } | null {
  if (session.user?.id && ObjectId.isValid(session.user.id)) {
    return { _id: new ObjectId(session.user.id) };
  }

  if (session.user?.email) {
    return { email: session.user.email.toLowerCase() };
  }

  return null;
}

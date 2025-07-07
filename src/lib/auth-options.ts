// lib/auth-options.ts

import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

async function authorize(credentials: Record<"email" | "password", string> | undefined): Promise<User | null> {
  if (!credentials) return null;

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });

  if (!res.ok) return null;

  const user = await res.json();
  if (user && user.email) {
    return user;
  }

  return null;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize,
    }),
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token?.email) {
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};

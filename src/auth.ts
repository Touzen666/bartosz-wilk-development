import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { db } from "~/server/db";
import type { Role } from "@prisma/client";

// ─── Rozszerzenie typów sesji NextAuth o rolę i id ───────────────────────────
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }
  interface User {
    role: Role;
  }
}

// ─── NextAuth config — Prisma adapter + sesje bazodanowe ─────────────────────
// strategy: "database" — każde logowanie tworzy wiersz w tabeli Session.
// Wylogowanie / wygaśnięcie usuwa ten wiersz, dzięki czemu możemy centralnie
// zarządzać aktywnymi sesjami (podgląd, wymuszenie wylogowania z admina itp.).
export const { handlers, signIn, signOut, auth } = NextAuth({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: PrismaAdapter(db) as any,
  session: { strategy: "database" },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email:    { label: "Email",  type: "email" },
        password: { label: "Hasło", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await db.user.findUnique({
          where: { email: String(credentials.email) },
        });

        if (!user?.password) return null;

        const passwordValid = await bcrypt.compare(
          String(credentials.password),
          user.password,
        );

        if (!passwordValid) return null;

        return {
          id:    user.id,
          email: user.email,
          name:  user.name,
          role:  user.role,
          image: user.image,
        };
      },
    }),
    // Tutaj dołącz providerów OAuth, np.:
    // Google({ clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! })
  ],

  callbacks: {
    // Z strategy: "database" callback session dostaje `user` (z DB) zamiast `token`
    session({ session, user }) {
      if (user) {
        session.user.id   = user.id;
        session.user.role = (user as { role: Role }).role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});

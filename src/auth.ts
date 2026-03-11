import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
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

// ─── NextAuth config — JWT + Credentials ──────────────────────────────────────
// Przy JWT (stateless) adapter bazodanowy nie jest potrzebny.
// Adapter dodamy gdy będziemy integrować zewnętrznych providerów OAuth (Google, GitHub).
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },

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
          user.password
        );

        if (!passwordValid) return null;

        return {
          id:    user.id,
          email: user.email,
          name:  user.name,
          role:  user.role,
        };
      },
    }),
    // Tutaj dołącz kolejnych providerów OAuth, np.:
    // Google({ clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! })
  ],

  callbacks: {
    // Przy logowaniu wstrzykuje id i rolę do JWT
    jwt({ token, user }) {
      if (user) {
        token.id   = user.id as string;
        token.role = user.role as Role;
      }
      return token;
    },
    // Przekazuje id i rolę z JWT do obiektu sesji widocznego po stronie klienta
    session({ session, token }) {
      session.user.id   = token.id as string;
      session.user.role = token.role as Role;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});

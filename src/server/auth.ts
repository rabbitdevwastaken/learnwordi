import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type AdapterUser, type Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";

import type { JWT } from "next-auth/jwt";

import { env } from "~/env";
import { db } from "~/server/db";
import { createTable } from "~/server/db/schema";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken: string;
    error?: string;
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
    error?: string;
    user: AdapterUser
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt', // Use JWT (JSON Web Token) as session strategy
    maxAge: 30 * 24 * 60 * 60, // Session max age in seconds
    updateAge: 24 * 60 * 60, // Session update age in seconds
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at ? account.expires_at * 1000 : Date.now(),
          refreshToken: account.refresh_token,
          user
        }
      }

      return token
    },
    session: ({ session, token }) => ({
      ...session,
      error: token.error,
      user: {
        ...token.user,
        id: token.user.id
      },
    }),
  },
  debug: true,
  adapter: DrizzleAdapter(db, createTable) as Adapter,
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);

import NextAuth from "next-auth";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import EmailProvider from "next-auth/providers/email";

const prisma = new PrismaClient();

  // Environment
  const environment = process.env.NODE_ENV || "development";

  const port: 465 | 587  = environment  === "production" ? 465 : 587

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET
      // version: "2.0"
    }),
    EmailProvider({
      server: {
        host: process.env.SMTP_SERVER_HOST,
        port: port,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    })
  ],
  session: {
    strategy: "database",
    maxAge: 30,
    updateAge: 12
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET
  },
  secret: process.env.NEXTAUTH_SECRET,
  // pages: {
  //   signIn: "/auth/signin",
  //   signOut: "/auth/signout",
  //   error: "/auth/error", // Error code passed in query string as ?error=
  //   verifyRequest: "/auth/verify-request", // (used for check email message)
  //   newUser: "/auth/new-user" // New users will be directed here on first sign in (leave the property out if not of interest)
  // },
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     return true
  //   },
  //   async redirect({ url, baseUrl }) {
  //     return baseUrl
  //   },
  //   async session({ session, token, user }) {
  //     return session
  //   },
  //   async jwt({ token, user, account, profile, isNewUser }) {
  //     return token
  //   }
  // },
  // events: {
  //   async signIn(message) { /* on successful sign in */ },
  //   async signOut(message) { /* on signout */ },
  //   async createUser(message) { /* user created */ },
  //   async updateUser(message) { /* user updated - e.g. their email was verified */ },
  //   async linkAccount(message) { /* account (e.g. Twitter) linked to a user */ },
  //   async session(message) { /* session is active */ },
  // },
  // logger: {
  //   error(code, metadata) {
  //     log.error(code, metadata)
  //   },
  //   warn(code) {
  //     log.warn(code)
  //   },
  //   debug(code, metadata) {
  //     log.debug(code, metadata)
  //   }
  // },
  debug: false
});

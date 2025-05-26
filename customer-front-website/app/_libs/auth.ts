import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      // If return true, then the current user is authorized to go
      // through onto that route that is being protected
      return !!auth;
    },
  },
  pages: {
    signIn: "/login",
  },
});

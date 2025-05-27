import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./api-service";

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
    // This run before the actual signup process happens
    async signIn({ user }) {
      // Create a new guest, when user sign in for the first time
      try {
        const existingGuest = await getGuest(user.email!);
        // If there is user or not
        if (!existingGuest)
          await createGuest({ email: user.email!, fullName: user.name! });
        return true;
      } catch {
        return false;
      }
    },
    // This run after the sign in callback and each time that session is
    // checked out
    async session({ session }) {
      // Here we get access to the session, and add the guestId here
      const guest = await getGuest(session.user.email);
      session.user.id = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

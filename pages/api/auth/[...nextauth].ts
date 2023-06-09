import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

 export const authOptions = {
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    // ...add more providers here
  ],

  pages: {
    signIn: "/login",
  },
  callbacks : {
    async session ({session, token}) {
      session.user.id = token.sub
        return session;
    } 
  }

};

export default NextAuth(authOptions);
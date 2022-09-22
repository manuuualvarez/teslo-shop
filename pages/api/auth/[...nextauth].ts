import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import { dbUsers } from "../../../database"


export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: 'Custom login',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'example@gmail.com' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
      },
      async authorize(credentials) {
        // Auth failed
        return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password)
      }
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here
  ],
  // Custom pages:
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/register',
  },
  // Duration
  session: {
    maxAge: 2592000, //30d
    strategy: 'jwt',
    updateAge: 86400, //day by day refresh
  },

  // Callbacks:
  callbacks: {
    async jwt({ token, account, user }){
      if (account) {
        token.accesToken = account.access_token;
        switch (account.type) {
          case 'oauth':
            token.user = await dbUsers.oAuthToDbUser(user?.email || '', user?.name || '');
            break;
          case 'credentials':
            token.user = user;
            break;
          default:
            break;
        }
      }
      return token
    },
    async session({ session, token, user }){
      session.accesToken = token.access_token;
      session.user = token.user as any;
      return session
    }
  }
}

export default NextAuth(authOptions)
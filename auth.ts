import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    GitHub,
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.uid = user.id
      return token
    },
  },
})

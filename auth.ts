import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    GitHub({
      profile(profile) {
        return {
          id: `${ profile.id }`,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, profile }) {
      token.id = profile?.id
      return token
    },
    session({ session, token, user }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
    signIn({ profile }) {
      return profile?.id?.toString() === process.env.ADMIN_GITHUB_ID || false
    },
  },
})

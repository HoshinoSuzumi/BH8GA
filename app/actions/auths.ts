'use server'

import { signIn, signOut, auth } from '@/auth'

export async function handleSignIn() {
  await signIn('github')
}

export async function handleSignOut() {
  await signOut()
}

export async function fetchAuth() {
  return await auth()
}

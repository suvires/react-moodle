'use client'

import { signOut } from 'next-auth/react'

export default function SignOut() {
  const handleSignOut = async () => {
    await signOut()
  }

  return <button onClick={handleSignOut}>Sign out</button>
}

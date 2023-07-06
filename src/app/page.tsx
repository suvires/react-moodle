import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import MyCourses from '@/components/MyCourses'
import Profile from '@/components/Profile'
import SignOut from '@/components/SignOut'
import { IProfile } from '@/interfaces/profile.interface'

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  if (session === null) throw new Error('Failed to get session')
  return (
    <main>
      <Profile profile={session.user.profile as IProfile} />
      <SignOut />
      <MyCourses />
    </main>
  )
}

import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import CourseList from '@/components/CourseList'
import Profile from '@/components/Profile'
import SignOut from '@/components/SignOut'
import { IProfile } from '@/interfaces/profile.interface'

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (session === null) throw new Error('Failed to get session')
  return (
    <>
      <Profile profile={session.user.profile as IProfile} />
      <SignOut />
      <CourseList />
    </>
  )
}

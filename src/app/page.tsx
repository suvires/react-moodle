import { authOptions } from './api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'
import CourseList from '../components/CourseList'
import Login from '../components/Login'
import Profile from '../components/Profile'

export default async function Home() {
  const session = await getServerSession(authOptions)
  console.log(session)
  if (session === null) throw new Error('Failed to get session')
  return (
    <>
      <Profile session={session} />
      <CourseList />
    </>
  )
}

import { getUser } from '@/utils/auth'
import MyCourses from '@/components/MyCourses'
import Profile from '@/components/Profile'
import SignOut from '@/components/SignOut'

export default async function HomePage() {
  const user = await getUser()
  return (
    <main>
      <Profile profile={user} />
      <SignOut />
      <MyCourses />
    </main>
  )
}

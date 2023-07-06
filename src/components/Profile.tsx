import { IProfile } from '@/interfaces/profile.interface'

interface ProfileProps {
  profile: IProfile
}

export default function Profile({ profile }: ProfileProps) {
  return <>{profile.fullname}</>
}

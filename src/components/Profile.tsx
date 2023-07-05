export default function Profile(session) {
  console.log(session)
  return <>{session.session.moodle_user.fullname}</>
}

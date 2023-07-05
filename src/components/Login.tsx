export default async function Login() {
  const email = 'react-moodle'
  const password = 'react-moodlE1'

  const siteUrl = 'https://formacion.easyyeah.com'
  const apiUrl = siteUrl + '/login/token.php'

  const requestData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      username: email,
      password: password,
      service: 'react-moodle', // Esto puede variar dependiendo de tu configuración
    }),
  }
  const token = await fetch(apiUrl, requestData)
    .then((response) => response.json())
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.error('Error:', error)
    })
  return (
    <>
      {token.token && <p>Logged: {token.token}</p>}
      {token.token && <p>Logged: {token.token}</p>}
      {token.error && <p>Not logged: {token.error}</p>}
    </>
  )
}

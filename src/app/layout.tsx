export const metadata = {
  title: 'React Moodle!',
  description: 'React Moodle!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}

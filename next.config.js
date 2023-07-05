/** @type {import('next').NextConfig} */
const nextConfig = (module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'formacion.easyyeah.com',
        port: '',
        pathname: '**',
      },
    ],
  },
})

module.exports = nextConfig

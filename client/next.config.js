/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BACKEND_URL: 'http://localhost:4000',
    TWITTER_CONTRACT:process.env.TWITTER_CONTRACT,
    USER_CONTRACT:process.env.USER_CONTRACT,
   // TRASACTION_CONTRACT:process.env.TWITTER_CONTRACT
   PROJECTID:process.env.PROJECTID,
   SUBDOMAIN:process.env.SUBDOMAIN,
   PROJECTSECRET:process.env.PROJECTSECRET,
   TWIDCOIN_CONTRACT:process.env.TWIDCOIN_CONTRACT,
   

  },
  images: {
    domains: ['images.pexels.com'],
  },
}

module.exports = nextConfig

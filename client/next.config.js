/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BACKEND_URL: 'http://localhost:4000',
    TWITTER_CONTRACT:"0x50CB4EC676E83d5f107B23827d4C7d35788DbAC7"
  },
}

module.exports = nextConfig

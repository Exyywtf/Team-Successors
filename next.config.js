// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    if (process.platform === "win32") {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          "**/pagefile.sys",
          "**/swapfile.sys",
          "**/DumpStack.log.tmp",
          "**/System Volume Information/**"
        ]
      }
    }

    return config
  }
}
module.exports = nextConfig

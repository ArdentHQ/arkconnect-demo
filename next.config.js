const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Setting to false to prevent double rendering.
  // See more at https://github.com/vercel/next.js/issues/35822
  reactStrictMode: false,
  swcMinify: true,
  i18n,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  env: {
    ARK_CHROME_EXTENSION_URL:
      "https://chromewebstore.google.com/detail/ark-connect/efcfcaonapdhdljmikbpmikhiklhfbhm?hl=en",
    ARK_FIREFOX_EXTENSION_URL:
      "https://addons.mozilla.org/en-US/firefox/addon/ark-connect/",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});
// Disable Turbopack and force Webpack for next-pwa compatibility
module.exports = withPWA({
  // Other Next.js config options here
  experimental: {
    turbo: {
      enabled: false
    }
  }
});

/** @type {import('next').NextConfig} */

const urls = [
  'media.boohoo.com',
  'lp2.hm.com'
];

const nextConfig = {
  images: {
    remotePatterns: urls.map((i) => {
      return {
        protocol: 'https',
        hostname: i,
        port: '',
      };
    }),
  },
};

module.exports = nextConfig;

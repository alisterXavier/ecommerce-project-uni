/** @type {import('next').NextConfig} */

const urls = [
  'media.boohoo.com',
  'm.media-amazon.com',
  'cdn-images.farfetch-contents.com',
  'lh3.googleusercontent.com',
  'kujowares.com',
  'i.ebayimg.com',
  'img.kwcdn.com',
  'images.asos-media.com',
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

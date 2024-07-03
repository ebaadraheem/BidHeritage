/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'oldheritage.s3.eu-north-1.amazonaws.com',
            port: '',
          },
        ],
      },
};

export default nextConfig;

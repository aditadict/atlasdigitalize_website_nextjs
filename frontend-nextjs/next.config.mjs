/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable image optimization with external domains
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "atlasdigitalize.com",
        pathname: "/storage/**",
      },
    ],
  },
  // Redirect root to /en
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

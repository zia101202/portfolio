/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "images.unsplash.com",
        },
      ],
      domains: ["assets.aceternity.com", "api.microlink.io"]
    },
  };
  
  export default nextConfig; // ✅ Use `export default` in ES Module
  

  
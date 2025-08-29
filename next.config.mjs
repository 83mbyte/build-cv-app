/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: ["@chakra-ui/react"],
        optimizeRouterScrolling: true,
    },
};

export default nextConfig;

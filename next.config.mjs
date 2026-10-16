const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    // Optimised images are re-used for 7 days instead of the 4 hour default.
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // Root-level image files in /public (not the hashed files under /_next/).
        source: "/:file([^/]+\\.(?:webp|jpg|jpeg|png|svg|ico))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

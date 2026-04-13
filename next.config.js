/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      // Vercel Blob Storage — obrazki projektu
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com", pathname: "/**" },
      // Supabase Storage
      { protocol: "https", hostname: "xohdpqbaoxennpgtybzk.supabase.co", pathname: "/storage/v1/object/public/**" },
    ],
    // Prefer AVIF (smallest), fallback to WebP
    formats: ["image/avif", "image/webp"],
    // Cache optimized images for 30 days on the CDN/browser
    minimumCacheTTL: 2592000,
    // Devices served (prevents generating too many variants)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  async headers() {
    return [
      // Immutable cache for hashed Next.js static assets (_next/static)
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Optimized images – long cache with stale-while-revalidate
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=2592000",
          },
        ],
      },
      // Public static assets (favicon, fonts, icons, manifests)
      {
        source: "/favicon(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/fonts/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/icons/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/images/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
      // HTML pages – CDN edge cache 60 s, revalidate in background up to 1 h
      {
        source: "/((?!api|_next|favicon|fonts|icons|images).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=60, stale-while-revalidate=3600",
          },
        ],
      },
      // Security headers
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // CSP — Content Security Policy (wymagane przez szefa)
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Next.js inline scripts + next-auth
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              // Style: własne + inline (Tailwind)
              "style-src 'self' 'unsafe-inline'",
              // Obrazki: własne + Unsplash + Vercel Blob + Supabase Storage
              "img-src 'self' data: blob: https://images.unsplash.com https://*.public.blob.vercel-storage.com https://xohdpqbaoxennpgtybzk.supabase.co",
              // Fonty
              "font-src 'self' data:",
              // API calls: własne + Supabase
              "connect-src 'self' https://xohdpqbaoxennpgtybzk.supabase.co https://*.supabase.co",
              // Frames: zablokowane
              "frame-src 'none'",
              // Obiekty: zablokowane
              "object-src 'none'",
              // Base URI: tylko własna domena
              "base-uri 'self'",
              // Formularze: tylko własna domena
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default config;

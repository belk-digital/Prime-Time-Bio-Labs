import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Applies site-wide, including /pb-console and the API routes.
        source: '/:path*',
        headers: [
          // Prevents this site from being embedded in a hidden/disguised iframe on another
          // site (clickjacking) — no legitimate reason for primetimebiolabs.com pages,
          // including the admin panel, to be framed by a third-party origin.
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Stops browsers from MIME-sniffing a response into executing as a different
          // content type than declared (e.g. treating an uploaded image as JS).
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Only send the origin (not the full URL/path/query) as a Referer header to other
          // sites — avoids leaking order IDs, tokens, etc. that might appear in the URL.
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Force HTTPS for a year, including subdomains, once a browser has seen this once.
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          // Explicitly deny access to sensitive browser APIs this site never uses.
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
    // NOTE: a Content-Security-Policy is intentionally not set here yet — this site loads
    // Stripe.js/Elements, Google Sign-In, Google Analytics, Microsoft Clarity, and R2-hosted
    // images, and a CSP wide enough to allow all of them (without silently breaking checkout
    // or analytics) needs to be built and tested deliberately rather than added in a rush.
  },
}

export default withPayload(nextConfig)

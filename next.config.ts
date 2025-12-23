const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "opengraph.githubassets.com",
      },
    ],
  },

  // Mark handlebars as external for server bundles (Node.js runtime)
  serverExternalPackages: ["handlebars"],

  // Optional: If you want to fully embrace Turbopack and silence any related warnings
  turbopack: {},
};

export default nextConfig;
  /**
   * Vercel/webpack complains about `require.extensions` used deep inside
   * `handlebars` (pulled in by Genkit -> dotprompt). We don't actually need
   * webpack to bundle `handlebars` itself – Node can require it at runtime.
   * Marking it as external avoids webpack parsing that file, which removes
   * the "require.extensions is not supported by webpack" error.
   */
  
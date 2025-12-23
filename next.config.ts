const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "opengraph.githubassets.com",
      },
    ],
  },
  /**
   * Vercel/webpack complains about `require.extensions` used deep inside
   * `handlebars` (pulled in by Genkit -> dotprompt). We don't actually need
   * webpack to bundle `handlebars` itself – Node can require it at runtime.
   * Marking it as external avoids webpack parsing that file, which removes
   * the "require.extensions is not supported by webpack" error.
   */
  webpack: (config: any) => {
    if (!config.externals) {
      config.externals = [];
    }

    // Ensure we can push into an array form of externals.
    if (Array.isArray(config.externals)) {
      config.externals.push({
        handlebars: "commonjs handlebars",
      });
    }

    return config;
  },
};

export default nextConfig;
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },

  vite: {
    server: {
      host: true,
      port: 8080,
      allowedHosts: ["customer-amulet-reapply.ngrok-free.dev"],
    },

    ssr: {
      external: ["__STATIC_CONTENT_MANIFEST"],
    },

    optimizeDeps: {
      include: ["framer-motion"],
    },

    assetsInclude: [
      "**/*.png",
      "**/*.jpg",
      "**/*.jpeg",
      "**/*.webp",
    ],
  },

  nitro: {
    preset: "vercel",
    storage: {
      db: {
        driver: "fs",
        base: "./data/db",
      },
    },
    prerender: {
      crawlLinks: true,
    },
  },
});
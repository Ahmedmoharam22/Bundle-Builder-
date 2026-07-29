import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    target: "esnext",

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          // React runtime — largest single chunk, isolate it
          if (/[\\\/]node_modules[\\\/](react|react-dom|scheduler)[\\\/]/.test(id)) {
            return "react";
          }

          // UI primitives (@base-ui/react) + CVA + tailwind-merge
          // These are only needed at interaction time, splitting reduces initial parse
          if (
            id.includes("@base-ui") ||
            id.includes("class-variance-authority") ||
            id.includes("tailwind-merge") ||
            id.includes("clsx")
          ) {
            return "ui-vendor";
          }

          // Icon library — already split, keep isolated
          if (id.includes("lucide-react")) return "icons";

          // State management
          if (id.includes("zustand")) return "zustand";
        },
      },
    },
  },
});
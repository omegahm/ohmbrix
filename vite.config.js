import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
    rollupOptions: {
      input: {
        index: resolve(import.meta.dirname, "index.html"),
        onsker: resolve(import.meta.dirname, "ønsker.html"),
      },
    },
  },
});

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "PGServiceSDK",
      fileName: (format) => `pg-service-sdk.${format}.js`,
    },
    rollupOptions: {
      output: {
        globals: {
          PGServiceSDK: "PGServiceSDK",
        },
      },
    },
  },
  plugins: [dts()],
});

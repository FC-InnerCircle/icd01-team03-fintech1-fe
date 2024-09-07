import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: [
          "babel-plugin-macros",
          [
            "@emotion/babel-plugin-jsx-pragmatic",
            {
              export: "jsx",
              import: "__cssprop",
              module: "@emotion/react",
            },
            "css-prop",
          ],
          [
            "@emotion/babel-plugin-jsx-pragmatic",
            {
              export: "Fragment",
              import: "__fragment",
              module: "react/jsx-runtime",
            },
            "fragment",
          ],
          ["@babel/plugin-transform-react-jsx", { pragma: "__cssprop", pragmaFrag: "__fragment" }],
        ],
      },
    }),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "PaymentSDK",
      fileName: (format) => `payment-sdk.${format}.js`,
      formats: ["es", "umd", "iife"],
    },
    rollupOptions: {
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        name: "PaymentSDK",
      },
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"), // 브라우저 환경에서 process.env.NODE_ENV 정의
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

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
  ],
});

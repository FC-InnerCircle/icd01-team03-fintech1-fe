/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors";
import forms from "@tailwindcss/forms";

const range = (from, to) => Array.from({ length: to - from + 1 }, (_, index) => index + from);
const generatePixelObject = (max) => ({
  ...range(1, max).reduce((acc, px) => {
    acc[`${px}`] = `${px}px`;
    return acc;
  }, {}),
});

const px0_50 = generatePixelObject(50);
const px0_100 = generatePixelObject(100);
const px0_300 = generatePixelObject(300);
const px0_1920 = generatePixelObject(1920);

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors,
    fontFamily: {},
    extend: {
      borderWidth: px0_50,
      width: px0_1920,
      height: px0_1920,
      minWidth: px0_1920,
      maxWidth: px0_1920,
      minHeight: px0_1920,
      maxHeight: px0_1920,
      fontSize: px0_100,
      padding: px0_100,
      margin: px0_100,
      spacing: px0_300,
      borderRadius: px0_300,
      lineHeight: px0_100,
      opacity: {
        80: ".80",
        64: ".64",
        40: ".40",
        24: ".24",
        16: ".16",
        8: ".8",
        4: ".4",
      },
    },
  },
  safelist: [
    {
      pattern: /(bg|border|text)-(transparent|white|black|current)/,
      variants: ["hover", "focus", "disabled"],
    },
    {
      pattern:
        /(bg|border|text)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)/,
      variants: ["hover", "focus", "disabled"],
    },
  ],
  plugins: [forms],
};

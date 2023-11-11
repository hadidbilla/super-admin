const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
const { parseColor } = require("tailwindcss/lib/util/color");
/** @type {import('tailwindcss').Config} */
/** Converts HEX color to RGB */
const toRGB = (value) => {
  return parseColor(value).color.join(" ");
};
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./base-components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)",
        info: "rgb(var(--color-info) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        pending: "rgb(var(--color-pending) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
        light: "rgb(var(--color-light) / <alpha-value>)",
        dark: "rgb(var(--color-dark) / <alpha-value>)",
      },
      container: {
        center: true,
      },
      fontFamily: {
        roboto: ["Roboto"],
        inter: ["Inter"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwindcss/nesting"),
    plugin(function ({ addBase, matchUtilities }) {
      addBase({
        // Default colors
        ":root": {
          "--color-primary": "13 117 110",
          "--color-secondary": toRGB(colors.slate["200"]),
          "--color-success": toRGB(colors.teal["600"]),
          "--color-info": toRGB(colors.cyan["500"]),
          "--color-warning": toRGB(colors.amber["500"]),
          "--color-pending": toRGB(colors.orange["500"]),
          "--color-danger": toRGB(colors.red["700"]),
          "--color-light": toRGB(colors.slate["100"]),
          "--color-dark": toRGB(colors.slate["800"]),
        },
      });
    })
  ],
}


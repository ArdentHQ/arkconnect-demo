const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("preline/plugin")],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Ubuntu", ...defaultTheme.fontFamily.sans],
      },
    },

    colors: {
      black: "rgb(var(--theme-color-black) / <alpha-value>)",
      white: "rgb(var(--theme-color-white) / <alpha-value>)",
      transparent: "transparent",

      // Tailwind overrides
      "theme-primary-50": "rgb(var(--theme-color-primary-50) / <alpha-value>)",
      "theme-primary-100":
        "rgb(var(--theme-color-primary-100) / <alpha-value>)",
      "theme-primary-200":
        "rgb(var(--theme-color-primary-200) / <alpha-value>)",
      "theme-primary-300":
        "rgb(var(--theme-color-primary-300) / <alpha-value>)",
      "theme-primary-400":
        "rgb(var(--theme-color-primary-400) / <alpha-value>)",
      "theme-primary-500":
        "rgb(var(--theme-color-primary-500) / <alpha-value>)",
      "theme-primary-600":
        "rgb(var(--theme-color-primary-600) / <alpha-value>)",
      "theme-primary-700":
        "rgb(var(--theme-color-primary-700) / <alpha-value>)",
      "theme-primary-800":
        "rgb(var(--theme-color-primary-800) / <alpha-value>)",
      "theme-primary-900":
        "rgb(var(--theme-color-primary-900) / <alpha-value>)",

      "theme-secondary-50":
        "rgb(var(--theme-color-secondary-50) / <alpha-value>)",
      "theme-secondary-100":
        "rgb(var(--theme-color-secondary-100) / <alpha-value>)",
      "theme-secondary-200":
        "rgb(var(--theme-color-secondary-200) / <alpha-value>)",
      "theme-secondary-300":
        "rgb(var(--theme-color-secondary-300) / <alpha-value>)",
      "theme-secondary-400":
        "rgb(var(--theme-color-secondary-400) / <alpha-value>)",
      "theme-secondary-500":
        "rgb(var(--theme-color-secondary-500) / <alpha-value>)",
      "theme-secondary-600":
        "rgb(var(--theme-color-secondary-600) / <alpha-value>)",
      "theme-secondary-700":
        "rgb(var(--theme-color-secondary-700) / <alpha-value>)",
      "theme-secondary-800":
        "rgb(var(--theme-color-secondary-800) / <alpha-value>)",
      "theme-secondary-900":
        "rgb(var(--theme-color-secondary-900) / <alpha-value>)",

      "theme-dark-50": "rgb(var(--theme-color-dark-50) / <alpha-value>)",
      "theme-dark-100": "rgb(var(--theme-color-dark-100) / <alpha-value>)",
      "theme-dark-200": "rgb(var(--theme-color-dark-200) / <alpha-value>)",
      "theme-dark-300": "rgb(var(--theme-color-dark-300) / <alpha-value>)",
      "theme-dark-400": "rgb(var(--theme-color-dark-400) / <alpha-value>)",
      "theme-dark-500": "rgb(var(--theme-color-dark-500) / <alpha-value>)",
      "theme-dark-600": "rgb(var(--theme-color-dark-600) / <alpha-value>)",
      "theme-dark-700": "rgb(var(--theme-color-dark-700) / <alpha-value>)",
      "theme-dark-800": "rgb(var(--theme-color-dark-800) / <alpha-value>)",
      "theme-dark-900": "rgb(var(--theme-color-dark-900) / <alpha-value>)",
      "theme-dark-950": "rgb(var(--theme-color-dark-950) / <alpha-value>)",

      "theme-danger-50": "rgb(var(--theme-color-danger-50) / <alpha-value>)",
      "theme-danger-100": "rgb(var(--theme-color-danger-100) / <alpha-value>)",
      "theme-danger-200": "rgb(var(--theme-color-danger-200) / <alpha-value>)",
      "theme-danger-300": "rgb(var(--theme-color-danger-300) / <alpha-value>)",
      "theme-danger-400": "rgb(var(--theme-color-danger-400) / <alpha-value>)",
      "theme-danger-500": "rgb(var(--theme-color-danger-500) / <alpha-value>)",
      "theme-danger-600": "rgb(var(--theme-color-danger-600) / <alpha-value>)",
      "theme-danger-700": "rgb(var(--theme-color-danger-700) / <alpha-value>)",
      "theme-danger-800": "rgb(var(--theme-color-danger-800) / <alpha-value>)",
      "theme-danger-900": "rgb(var(--theme-color-danger-900) / <alpha-value>)",

      "theme-warning-50": "rgb(var(--theme-color-warning-50) / <alpha-value>)",
      "theme-warning-100":
        "rgb(var(--theme-color-warning-100) / <alpha-value>)",
      "theme-warning-200":
        "rgb(var(--theme-color-warning-200) / <alpha-value>)",
      "theme-warning-300":
        "rgb(var(--theme-color-warning-300) / <alpha-value>)",
      "theme-warning-400":
        "rgb(var(--theme-color-warning-400) / <alpha-value>)",
      "theme-warning-500":
        "rgb(var(--theme-color-warning-500) / <alpha-value>)",
      "theme-warning-600":
        "rgb(var(--theme-color-warning-600) / <alpha-value>)",
      "theme-warning-700":
        "rgb(var(--theme-color-warning-700) / <alpha-value>)",
      "theme-warning-800":
        "rgb(var(--theme-color-warning-800) / <alpha-value>)",
      "theme-warning-900":
        "rgb(var(--theme-color-warning-900) / <alpha-value>)",

      "theme-success-50": "rgb(var(--theme-color-success-50) / <alpha-value>)",
      "theme-success-100":
        "rgb(var(--theme-color-success-100) / <alpha-value>)",
      "theme-success-200":
        "rgb(var(--theme-color-success-200) / <alpha-value>)",
      "theme-success-300":
        "rgb(var(--theme-color-success-300) / <alpha-value>)",
      "theme-success-400":
        "rgb(var(--theme-color-success-400) / <alpha-value>)",
      "theme-success-500":
        "rgb(var(--theme-color-success-500) / <alpha-value>)",
      "theme-success-600":
        "rgb(var(--theme-color-success-600) / <alpha-value>)",
      "theme-success-700":
        "rgb(var(--theme-color-success-700) / <alpha-value>)",
      "theme-success-800":
        "rgb(var(--theme-color-success-800) / <alpha-value>)",
      "theme-success-900":
        "rgb(var(--theme-color-success-900) / <alpha-value>)",

      "theme-info-50": "rgb(var(--theme-color-info-50) / <alpha-value>)",
      "theme-info-100": "rgb(var(--theme-color-info-100) / <alpha-value>)",
      "theme-info-200": "rgb(var(--theme-color-info-200) / <alpha-value>)",
      "theme-info-300": "rgb(var(--theme-color-info-300) / <alpha-value>)",
      "theme-info-400": "rgb(var(--theme-color-info-400) / <alpha-value>)",
      "theme-info-500": "rgb(var(--theme-color-info-500) / <alpha-value>)",
      "theme-info-600": "rgb(var(--theme-color-info-600) / <alpha-value>)",
      "theme-info-700": "rgb(var(--theme-color-info-700) / <alpha-value>)",
      "theme-info-800": "rgb(var(--theme-color-info-800) / <alpha-value>)",
      "theme-info-900": "rgb(var(--theme-color-info-900) / <alpha-value>)",

      "theme-vote-background":
        "rgba(var(--theme-color-vote-background) / <alpha-value>)",
    },
  },
};

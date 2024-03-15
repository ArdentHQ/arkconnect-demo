const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        sm: "0px 1px 4px 0px rgba(0, 0, 0, 0.05)",
        xl: "0px 15px 35px 0px rgba(46, 46, 46, 0.14)",
      },
      borderRadius: {
        "2.5xl": "1.25rem",
      },
    },

    colors: {
      black: "rgb(var(--theme-color-black) / <alpha-value>)",
      "subtle-black": "rgb(var(--theme-color-subtle-black) / <alpha-value>)",
      "base-black": "rgb(var(--theme-color-base-black) / <alpha-value>)",

      white: "rgb(var(--theme-color-white) / <alpha-value>)",
      "subtle-white": "rgb(var(--theme-color-subtle-white) / <alpha-value>)",

      transparent: "transparent",

      // primary
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
      "theme-primary-650":
        "rgb(var(--theme-color-primary-650) / <alpha-value>)",
      "theme-primary-700":
        "rgb(var(--theme-color-primary-700) / <alpha-value>)",
      "theme-primary-800":
        "rgb(var(--theme-color-primary-800) / <alpha-value>)",
      "theme-primary-900":
        "rgb(var(--theme-color-primary-900) / <alpha-value>)",

      // error
      "theme-error-25": "rgb(var(--theme-color-error-25) / <alpha-value>)",
      "theme-error-50": "rgb(var(--theme-color-error-50) / <alpha-value>)",
      "theme-error-100": "rgb(var(--theme-color-error-100) / <alpha-value>)",
      "theme-error-200": "rgb(var(--theme-color-error-200) / <alpha-value>)",
      "theme-error-300": "rgb(var(--theme-color-error-300) / <alpha-value>)",
      "theme-error-400": "rgb(var(--theme-color-error-400) / <alpha-value>)",
      "theme-error-500": "rgb(var(--theme-color-error-500) / <alpha-value>)",
      "theme-error-600": "rgb(var(--theme-color-error-600) / <alpha-value>)",
      "theme-error-700": "rgb(var(--theme-color-error-700) / <alpha-value>)",
      "theme-error-800": "rgb(var(--theme-color-error-800) / <alpha-value>)",
      "theme-error-900": "rgb(var(--theme-color-error-900) / <alpha-value>)",

      // warning
      "theme-warning-25": "rgb(var(--theme-color-warning-25) / <alpha-value>)",
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

      // success
      "theme-success-50": "rgb(var(--theme-color-success-50) / <alpha-value>)",
      "theme-success-100": "rgb(var(--theme-color-success-100) / <alpha-value>)",
      "theme-success-200": "rgb(var(--theme-color-success-200) / <alpha-value>)",
      "theme-success-300": "rgb(var(--theme-color-success-300) / <alpha-value>)",
      "theme-success-400": "rgb(var(--theme-color-success-400) / <alpha-value>)",
      "theme-success-500": "rgb(var(--theme-color-success-500) / <alpha-value>)",
      "theme-success-600": "rgb(var(--theme-color-success-600) / <alpha-value>)",
      "theme-success-700": "rgb(var(--theme-color-success-700) / <alpha-value>)",
      "theme-success-800": "rgb(var(--theme-color-success-800) / <alpha-value>)",
      "theme-success-900": "rgb(var(--theme-color-success-900) / <alpha-value>)",

      // gray
      "theme-gray-25": "rgb(var(--theme-color-gray-25) / <alpha-value>)",
      "theme-gray-50": "rgb(var(--theme-color-gray-50) / <alpha-value>)",
      "theme-gray-100": "rgb(var(--theme-color-gray-100) / <alpha-value>)",
      "theme-gray-200": "rgb(var(--theme-color-gray-200) / <alpha-value>)",
      "theme-gray-300": "rgb(var(--theme-color-gray-300) / <alpha-value>)",
      "theme-gray-400": "rgb(var(--theme-color-gray-400) / <alpha-value>)",
      "theme-gray-500": "rgb(var(--theme-color-gray-500) / <alpha-value>)",
      "theme-gray-600": "rgb(var(--theme-color-gray-600) / <alpha-value>)",
      "theme-gray-700": "rgb(var(--theme-color-gray-700) / <alpha-value>)",
      "theme-gray-800": "rgb(var(--theme-color-gray-800) / <alpha-value>)",

      // dark green
      "dark-green": "rgb(var(--theme-color-dark-green) / <alpha-value>)",
    },
  },
};

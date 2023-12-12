module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  localePath: "./i18n/locales",
  // https://www.i18next.com/overview/configuration-options#logging
  debug: false,
  reloadOnPrerender: process.env.NODE_ENV === "development",
};

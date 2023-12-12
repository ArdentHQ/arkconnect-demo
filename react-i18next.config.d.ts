import "next-i18next";

// import all namespaces (for the default language, only)
import { Resources as MyResources } from "./i18n/react-i18next.contracts";

declare module "next-i18next" {
  interface Resources extends MyResources {}
}

declare module "i18next" {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

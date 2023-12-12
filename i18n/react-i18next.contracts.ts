// Import all namespaces for default language only.
import common from "./locales/en/common.json"

export type TTranslationKey = keyof typeof common

export interface Resources {
  common: typeof common
}

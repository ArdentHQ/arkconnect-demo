// Import all namespaces for default language only.
import common from "./locales/en/common.json";
import transactions from "./locales/en/transactions.json";

export type TTranslationKey = keyof typeof common & keyof typeof transactions;

export interface Resources {
  common: typeof common;
  transactions: typeof transactions;
}

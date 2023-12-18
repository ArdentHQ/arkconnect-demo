import BigNumber from "bignumber.js";
import { Coin } from "@/app/lib/Network";

export function Currency({
  value,
  coin,
}: {
  value: string | number;
  coin?: Coin;
}) {
  const number = BigNumber(value);

  return {
    /**
     * Returns number in USD format.
     *
     * @returns {string}
     */
    toUSD(): string {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
        minimumFractionDigits: 0,
      }).format(number.toNumber());
    },
    /**
     *  Returns number in ARK format.
     *
     * @returns {string}
     */
    toARK(): string {
      const formatted = new Intl.NumberFormat("en-US", {
        style: "decimal",
        maximumFractionDigits: 8,
        minimumFractionDigits: 0,
      }).format(number.toNumber());

      return [formatted, coin].join(" ");
    },
    /**
     *  Returns number in crypto format
     *  (from 2 up to 8 decimals) and without a suffix.
     *
     * @returns {string}
     */
    toCrypto(): string {
      return new Intl.NumberFormat("en-US", {
        style: "decimal",
        maximumFractionDigits: 8,
        minimumFractionDigits: 2,
      }).format(number.toNumber());
    },
  };
}

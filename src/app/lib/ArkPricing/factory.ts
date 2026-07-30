import BigNumber from "bignumber.js";
import { PriceResponse } from "./contracts";
import { isTruthy } from "@/app/utils/isTruthy";
import { Coin } from "@/app/lib/Network";

/**
 * ARK Pricing service to retrieve ARK's current price.
 */
export function ArkPricing() {
  const coin = Coin.ARK;
  const currency = process.env.NEXT_PUBLIC_PRICING_CURRENCY ?? "USD";
  const baseUrl =
    process.env.NEXT_PUBLIC_PRICING_API_URL ??
    "https://pricing.ardenthq.com/api/v1/coins";

  const state = new Map<"price", number>();
  state.set("price", 0);

  return {
    /**
     * Fetch the current price for ARK.
     *
     * @returns {Promise<void>}
     */
    async sync(): Promise<void> {
      const endpoint = `${baseUrl}/${coin.toLowerCase()}/price?currencies[]=${currency}`;

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(
          `[ArkPricing#sync] Failed to retrieve the price for ${coin}. Error status: ${response.status}`,
        );
      }

      const { data } = (await response.json()) as PriceResponse;
      const price = data.prices[currency]?.price;

      if (!isTruthy(price)) {
        throw new Error(
          `[ArkPricing#sync] Failed to retrieve the price for ${coin}`,
        );
      }

      state.set("price", price);
    },
    /**
     * Returns the current price for ARK.
     *
     * @returns {number}
     */
    price(): BigNumber {
      const price = state.get("price");

      if (price === undefined) {
        throw new Error(
          `[ArkPricing#price] Failed to find price for ${coin}. Did you run ArkPricing#sync first?`,
        );
      }

      return new BigNumber(price);
    },
  };
}

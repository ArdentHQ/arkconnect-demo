import BigNumber from "bignumber.js";
import { MarketDataResponseItem } from "./contracts";
import { isTruthy } from "@/app/utils/isTruthy";
import { Coin } from "@/app/lib/Network";

/**
 * Coingecko service to retrieve ARK's current price.
 */
export function Coingecko() {
  const coin = Coin.ARK;

  const state = new Map<"price", number>();
  state.set("price", 0);

  return {
    /**
     * Fetch market data for ARK.
     *
     * @returns {Promise<void>}
     */
    async sync(): Promise<void> {
      console.log("fetched")
      // TODO: remove hardcoded variables.
      const currency = "usd";
      const endpoint = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coin.toLowerCase()}`;

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(
          `[Coingecko#sync] Failed to retrieve market data for ${coin}. Error status: ${response.status}`,
        );
      }

      const data = (await response.json()) as MarketDataResponseItem[];
      const arkMarketRate = data.find((rateItem) => rateItem.name === coin);

      if (!isTruthy(arkMarketRate)) {
        throw new Error(
          `[Coingecko#sync] Failed to retrieve market data for ${coin}`,
        );
      }

      state.set("price", arkMarketRate.current_price);
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
          `[Coingecko#price] Failed to find price for ${coin}. Did you run Coingecko#syncRates first?`,
        );
      }

      return new BigNumber(price);
    },
  };
}

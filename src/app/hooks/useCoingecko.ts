import BigNumber from "bignumber.js";
import { useQuery } from "@tanstack/react-query";
import { Coingecko } from "@/app/lib/Coingecko";
import { Coin } from "@/app/lib/Network";

export const useCoingecko = (coin: Coin) => {
  return useQuery({
    staleTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: BigNumber(0),
    enabled: coin !== Coin.DARK,
    queryKey: ["rate", coin],
    queryFn: async () => {
      const exchange = Coingecko();
      await exchange.sync();
      return exchange.price();
    },
  });
};

import { useQuery } from "@tanstack/react-query/build/modern/index";
import BigNumber from "bignumber.js";
import { Coingecko } from "@/app/lib/Coingecko";

export const useCoingecko = (coin: string) => {
  return useQuery({
    staleTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: BigNumber(0),
    queryKey: ["rate", coin],
    queryFn: async () => {
      const exchange = Coingecko();
      await exchange.sync();
      return exchange.price();
    },
  });
};

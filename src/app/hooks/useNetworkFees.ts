import { useQuery } from "@tanstack/react-query";
import BigNumber from "bignumber.js";
import { useCoingecko } from "@/app/hooks/useCoingecko";
import { Coin, NetworkType } from "@/app/lib/Network";
import { CurrencyFormatter } from "@/app/utils/currencyFormatter";

interface Fees {
  avg: string;
  max: string;
  min: string;
}

interface FeesApiResponse {
  data: {
    "1": {
      transfer: Fees;
    };
  };
}

const formatFee = (fee: string, rate: BigNumber) => {
  const cryptoAmount = BigNumber(fee).multipliedBy(0.000_000_01);

  return {
    fiat: CurrencyFormatter.cryptoToCurrency(cryptoAmount, rate, {
      decimals: 2,
    }),
    crypto: cryptoAmount.decimalPlaces(4).toFixed(4),
  };
};

export const useNetworkFees = (network: NetworkType) => {
  const networkUrls = {
    [NetworkType.DEVNET]: "https://dwallets.ark.io/api/node/fees",
    [NetworkType.MAINNET]: "https://wallets.ark.io/api/node/fees",
  };

  const { data: fees } = useQuery({
    queryKey: ["network-fees", network],
    staleTime: 0,
    refetchInterval: 3 * 60 * 1000, // 3 minutes
    queryFn: async () => {
      const jsonResponse = await fetch(networkUrls[network]);
      const response = (await jsonResponse.json()) as FeesApiResponse;

      return response.data["1"].transfer;
    },
  });

  const { data: rate } = useCoingecko(
    network === NetworkType.DEVNET ? Coin.DARK : Coin.ARK,
  );

  if (fees && rate) {
    return {
      status: "ok",
      fees: {
        min: formatFee(fees.min, rate),
        avg: formatFee(fees.avg, rate),
        max: formatFee(fees.max, rate),
      },
    };
  }

  return {
    status: "loading",
    fees: undefined,
  };
};

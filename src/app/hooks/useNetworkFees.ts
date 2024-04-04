import { useQuery } from "@tanstack/react-query";
import BigNumber from "bignumber.js";
import { useCoingecko } from "@/app/hooks/useCoingecko";
import { Coin, NetworkType, TransactionType } from "@/app/lib/Network";
import { CurrencyFormatter } from "@/app/utils/currencyFormatter";

interface Fees {
  avg: string;
  max: string;
  min: string;
}

interface DynamicFeesApiResponse {
  data: {
    "1": {
      transfer: Fees;
      vote: Fees;
    };
  };
}
interface StaticFeesApiResponse {
  data: {
    "1": {
      transfer: string;
      vote: string;
    };
  };
}

const formatFee = (fee: string, rate: BigNumber) => {
  const cryptoAmount = BigNumber(fee).multipliedBy(0.000_000_01);

  return {
    fiat: CurrencyFormatter.cryptoToCurrency(cryptoAmount, rate, {
      decimals: 2,
    }),
    crypto: Number.parseFloat(
      cryptoAmount.decimalPlaces(4).toFixed(4),
    ).toString(),
  };
};

export const useNetworkFees = (network: NetworkType, type: TransactionType) => {
  const dynamicFeeNetworkUrls = {
    [NetworkType.DEVNET]: "https://dwallets.ark.io/api/node/fees",
    [NetworkType.MAINNET]: "https://wallets.ark.io/api/node/fees",
  };

  const staticFeeNetworksUrls = {
    [NetworkType.DEVNET]: "https://dwallets.ark.io/api/transactions/fees",
    [NetworkType.MAINNET]: "https://wallets.ark.io/api/transactions/fees",
  };

  const { data: dynamicFees } = useQuery({
    queryKey: ["dynamic-network-fees", network],
    staleTime: 0,
    refetchInterval: 3 * 60 * 1000, // 3 minutes
    queryFn: async () => {
      const jsonResponse = await fetch(dynamicFeeNetworkUrls[network]);
      const response = (await jsonResponse.json()) as DynamicFeesApiResponse;

      return type === TransactionType.VOTE
        ? response.data["1"].vote
        : response.data["1"].transfer;
    },
  });

  const { data: staticFee } = useQuery({
    queryKey: ["static-network-fees", network],
    staleTime: 0,
    refetchInterval: 3 * 60 * 1000, // 3 minutes
    queryFn: async () => {
      const jsonResponse = await fetch(staticFeeNetworksUrls[network]);
      const response = (await jsonResponse.json()) as StaticFeesApiResponse;

      return type === TransactionType.VOTE
        ? response.data["1"].vote
        : response.data["1"].transfer;
    },
  });

  const { data: rate } = useCoingecko(
    network === NetworkType.DEVNET ? Coin.DARK : Coin.ARK,
  );

  if (dynamicFees && rate && staticFee) {
    return {
      status: "ok",
      fees: {
        min: formatFee(dynamicFees.min, rate),
        avg: formatFee(dynamicFees.avg, rate),
        max: formatFee(staticFee, rate),
      },
    };
  }

  return {
    status: "loading",
    fees: undefined,
  };
};

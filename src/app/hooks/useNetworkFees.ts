import { useQuery } from "@tanstack/react-query";
import BigNumber from "bignumber.js";
import { useCoingecko } from "@/app/hooks/useCoingecko";
import { Coin, NetworkType, TransactionType } from "@/app/lib/Network";
import { CurrencyFormatter } from "@/app/utils/currencyFormatter";

interface DynamicFeesApiResponse {
  data: {
    evmCall: {
      avg: string;
      min: string;
      max: string;
      sum: string;
    };
  };
}

const GWEI_MULTIPLIER = 1_000_000_000; // 1e9

export const GasLimit: Record<
  Lowercase<keyof typeof TransactionType>,
  BigNumber
> = {
  transfer: BigNumber(21_000),
  vote: BigNumber(200_000),
};

export const calculateFee = (gasPrice: BigNumber, gasLimit: BigNumber) => {
  return gasPrice.multipliedBy(gasLimit).dividedBy(GWEI_MULTIPLIER);
};

const formatFee = (gasPrice: string, gasLimit: BigNumber, rate: BigNumber) => {
  const gasPriceBig = new BigNumber(gasPrice).dividedBy(GWEI_MULTIPLIER);
  const fee = calculateFee(gasPriceBig, gasLimit);

  return {
    fiat: CurrencyFormatter.cryptoToCurrency(fee, rate, {
      decimals: 2,
    }),
    gasPrice: gasPriceBig,
    gasLimit: gasLimit,
    fee,
  };
};

export const useNetworkFees = (network: NetworkType, type: TransactionType) => {
  const networkFeeUrls = {
    [NetworkType.DEVNET]: "https://dwallets-evm.mainsailhq.com/api/node/fees",
    [NetworkType.MAINNET]: "https://dwallets-evm.mainsailhq.com/api/node/fees",
  };

  const { data: fees } = useQuery({
    queryKey: ["fees", network],
    staleTime: 0,
    refetchInterval: 3 * 60 * 1000, // 3 minutes
    queryFn: async () => {
      const jsonResponse = await fetch(networkFeeUrls[network]);
      return (await jsonResponse.json()) as DynamicFeesApiResponse; // Return the entire response object
    },
  });

  const { data: rate } = useCoingecko(
    network === NetworkType.DEVNET ? Coin.DARK : Coin.ARK,
  );

  const gasLimit = GasLimit[type];

  if (fees && rate) {
    const { min, max, avg } = fees.data.evmCall;

    return {
      status: "ok",
      gasLimit,
      fees: {
        min: formatFee(min, gasLimit, rate),
        avg: formatFee(avg, gasLimit, rate),
        max: formatFee(max, gasLimit, rate),
      },
    };
  }

  return {
    status: "loading",
    gasLimit,
    fees: undefined,
  };
};

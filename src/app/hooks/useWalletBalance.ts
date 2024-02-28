import { useQuery } from "@tanstack/react-query";
import BigNumber from "bignumber.js";
import { WalletData } from "@/app/lib/Wallet/contracts";
import { Coingecko } from "@/app/lib/Coingecko";
import { Wallet } from "@/app/lib/Wallet";

export const useWalletBalance = ({
  walletData,
}: {
  walletData: WalletData;
}) => {
  const {
    data: price,
    isSuccess,
    isLoading,
  } = useQuery({
    staleTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: BigNumber(0),
    queryKey: ["rate", walletData.coin],
    queryFn: async () => {
      const exchange = Coingecko();
      await exchange.sync();
      return exchange.price();
    },
  });

  const wallet = Wallet(walletData);
  const balance = wallet.balance(price ?? BigNumber(0));

  return {
    balance: {
      ark: balance.toARK(),
      usd: balance.toUSD(),
    },
    isSuccess,
    isLoading,
  };
};

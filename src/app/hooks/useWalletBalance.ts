import { useQuery } from "@tanstack/react-query";
import BigNumber from "bignumber.js";
import { WalletData } from "@/app/lib/Wallet/contracts";
import { Coingecko } from "@/app/lib/Coingecko";
import { Wallet } from "@/app/lib/Wallet";
import { useCoingecko } from "@/app/hooks/useCoingecko";

export const useWalletBalance = ({
  walletData,
}: {
  walletData: WalletData;
}) => {
  const { data: price, isLoading, isSuccess } = useCoingecko(wallet.coin());
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

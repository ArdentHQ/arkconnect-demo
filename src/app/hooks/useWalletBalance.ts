import BigNumber from "bignumber.js";
import { WalletData } from "@/app/lib/Wallet/contracts";
import { Wallet } from "@/app/lib/Wallet";
import { useArkPricing } from "@/app/hooks/useArkPricing";

export const useWalletBalance = ({
  walletData,
}: {
  walletData: WalletData;
}) => {
  const wallet = Wallet(walletData);

  const { data: price, isLoading, isSuccess } = useArkPricing(wallet.coin());

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

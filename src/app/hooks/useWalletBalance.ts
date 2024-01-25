import { useQuery } from "@tanstack/react-query";
import { Wallet } from "@/app/lib/Wallet";
import { WalletData } from "@/app/lib/Wallet/contracts";

export const useWalletBalance = ({
  walletData,
}: {
  walletData: WalletData;
}) => {
  const { data, isSuccess, isLoading } = useQuery({
    staleTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: {
      ark: "0",
      usd: "0",
    },
    queryKey: ["rate", walletData.coin],
    queryFn: async () => {
      const wallet = Wallet(walletData);

      await wallet.syncRates();

      return {
        ark: wallet.balance().toARK(),
        usd: wallet.balance().toUSD(),
      };
    },
  });

  return {
    balance: data,
    isSuccess,
    isLoading,
  };
};

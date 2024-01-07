import { useQuery } from "@tanstack/react-query";
import { Wallet } from "@/app/lib/Wallet";
import { WalletData } from "@/app/lib/Wallet/contracts";

export const useWalletBalance = ({
  walletData,
}: {
  walletData: WalletData;
}) => {
  const { data, isSuccess, isLoading } = useQuery({
    staleTime: 0,
    initialData: {
      ark: "0",
      usd: "0",
    },
    queryKey: ["rate", walletData.address],
    queryFn: async () => {
      const wallet = Wallet(walletData);

      if (wallet.network().isMainnet()) {
        await wallet.syncRates();
      }

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

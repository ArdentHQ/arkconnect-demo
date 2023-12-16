import { useQuery } from "@tanstack/react-query";
import { Wallet, WalletData } from "@/app/lib";

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
    queryKey: ["rate"],
    queryFn: async () => {
      const wallet = Wallet(walletData);
      await wallet.sync();

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

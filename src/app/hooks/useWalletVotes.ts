import { useQuery } from "@tanstack/react-query";
import { Wallet } from "@/app/lib/Wallet";
import { WalletData } from "@/app/lib/Wallet/contracts";

export const useWalletVotes = ({ walletData }: { walletData: WalletData }) => {
  const { data } = useQuery({
    staleTime: 0,
    queryKey: ["delegates"],
    initialData: {
      delegates: [],
      votingDelegate: undefined,
    },
    queryFn: async () => {
      const wallet = Wallet(walletData);

      await wallet.votes().sync();
      await wallet.delegates().sync();

      return {
        delegates: wallet.delegates().items(),
        votingDelegate: wallet.votingDelegate(),
      };
    },
    refetchInterval: false,
  });

  return data;
};

import { useQuery } from "@tanstack/react-query";
import { WalletData } from "@/app/lib/Wallet/contracts";
import { DelegatesList } from "@/domains/vote/components/DelegatesList";
import { Wallet } from "@/app/lib/Wallet";

export const Delegates = ({ walletData }: { walletData: WalletData }) => {
  const { data } = useQuery({
    staleTime: 0,
    queryKey: ["delegates"],
    initialData: {
      delegates: [],
      currentVote: undefined,
    },
    queryFn: async () => {
      const wallet = Wallet(walletData);

      await wallet.votes().sync();
      await wallet.delegates().sync();

      return {
        delegates: wallet.delegates().items(),
        currentVote: wallet.votingDelegate()?.address,
      };
    },
    refetchInterval: false,
  });

  return (
    <DelegatesList
      delegates={data.delegates}
      onChange={console.log}
      currentVote={data.currentVote}
    />
  );
};

import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { Wallet } from "@/app/lib/Wallet";
import { WalletData } from "@/app/lib/Wallet/contracts";

export const useWalletVotes = ({ walletData }: { walletData: WalletData }) => {
  const { data, refetch } = useQuery({
    staleTime: 0,
    queryKey: ["validators"],
    initialData: () => ({
      validators: [],
      votingValidator: undefined,
    }),
    queryFn: async () => {
      const wallet = Wallet(walletData);

      try {
        await wallet.votes().sync();
      } catch {
        // If the sync fails, it means the wallet is offline wallet,
        // can safely ignore as the votes will be an empty array.
      }

      await Promise.all([
        wallet.syncVotingValidator(),
        wallet.validators().sync(),
      ]);

      return {
        validators: wallet.validators().items(),
        votingValidator: wallet.votingValidator(),
      };
    },
    refetchInterval: false,
  });

  const refetchCallback = useCallback(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    refetchCallback();
  }, [walletData.address]);

  return data;
};

import { WalletData } from "@/app/lib/Wallet/contracts";
import { DelegatesList } from "@/domains/vote/components/DelegatesList";
import { useWalletVotes } from "@/app/hooks/useWalletVotes";

export const Delegates = ({ walletData }: { walletData: WalletData }) => {
  const { votingDelegate, delegates } = useWalletVotes({ walletData });

  return (
    <DelegatesList
      delegates={delegates}
      onChange={console.log}
      currentVote={votingDelegate?.publicKey}
    />
  );
};

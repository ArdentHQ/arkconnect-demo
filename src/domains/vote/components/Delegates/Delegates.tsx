import { WalletData } from "@/app/lib/Wallet/contracts";
import { DelegatesList } from "@/domains/vote/components/DelegatesList";
import { useWalletVotes } from "@/app/hooks/useWalletVotes";
import {VotingState} from "@/domains/vote/components/VoteModal";

export const Delegates = ({
  walletData,
  onChange,
}: {
  walletData: WalletData;
  onChange: ({
    votes,
    unvotes,
  }: VotingState) => void;
}) => {
  const { votingDelegate, delegates } = useWalletVotes({ walletData });

  return (
    <DelegatesList
      delegates={delegates}
      onChange={onChange}
      currentVote={votingDelegate?.publicKey}
    />
  );
};

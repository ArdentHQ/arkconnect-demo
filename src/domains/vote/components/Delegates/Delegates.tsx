import { useMemo } from "react";
import { WalletData } from "@/app/lib/Wallet/contracts";
import { DelegatesList } from "@/domains/vote/components/DelegatesList";
import { useWalletVotes } from "@/app/hooks/useWalletVotes";
import { VotingState } from "@/domains/vote/components/VoteModal";

export const Delegates = ({
  walletData,
  onChange,
  searchTerm,
}: {
  walletData: WalletData;
  onChange: ({ votes, unvotes }: VotingState) => void;
  searchTerm: string;
}) => {
  const { votingDelegate, delegates } = useWalletVotes({ walletData });

  const filteredDelegates = useMemo(() => {
    if (!searchTerm || searchTerm.length === 0) {
      return delegates;
    }

    const searchRegex = new RegExp(searchTerm, "i");

    return delegates.filter(
      (delegate) => delegate.username.search(searchRegex) > -1,
    );
  }, [searchTerm, delegates]);

  return (
    <DelegatesList
      delegates={filteredDelegates.slice(0, 51)}
      onChange={onChange}
      votingDelegate={votingDelegate}
    />
  );
};

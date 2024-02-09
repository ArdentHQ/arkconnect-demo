import { useMemo } from "react";
import { WalletData } from "@/app/lib/Wallet/contracts";
import { DelegatesList } from "@/domains/vote/components/DelegatesList";
import { useWalletVotes } from "@/app/hooks/useWalletVotes";
import { VotingState } from "@/domains/vote/components/VoteModal";
import { DelegateItem } from "@/app/lib/Delegates";

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

  const includeResigned = useMemo<boolean>(() => {
    const votingDelegateIsPresent = delegates.some(
      (delegate) => delegate.address === votingDelegate?.address,
    );

    return !votingDelegateIsPresent && votingDelegate !== undefined;
  }, [delegates, votingDelegate]);

  const delegatesIncludingResigned = useMemo<DelegateItem[]>(() => {
    if (includeResigned) {
      return [votingDelegate as DelegateItem, ...delegates];
    }

    return delegates;
  }, [delegates, votingDelegate, includeResigned]);

  const filteredDelegates = useMemo(() => {
    if (!searchTerm || searchTerm.length === 0) {
      return delegatesIncludingResigned;
    }

    const searchRegex = new RegExp(searchTerm, "i");

    return delegatesIncludingResigned
      .filter((delegate) => delegate.username.search(searchRegex) > -1)
      .slice(0, includeResigned ? 52 : 51);
  }, [searchTerm, delegatesIncludingResigned, includeResigned]);

  return (
    <DelegatesList
      delegates={filteredDelegates}
      onChange={onChange}
      currentVote={votingDelegate?.address}
    />
  );
};

import { useMemo } from "react";
import { WalletData } from "@/app/lib/Wallet/contracts";
import { ValidatorsList } from "src/domains/vote/components/ValidatorsList";
import { useWalletVotes } from "@/app/hooks/useWalletVotes";
import { VotingState } from "@/domains/vote/components/VoteModal";
import { ValidatorItem } from "src/app/lib/Validators";

export const Validators = ({
  walletData,
  onChange,
  searchTerm,
}: {
  walletData: WalletData;
  onChange: ({ votes, unvotes }: VotingState) => void;
  searchTerm: string;
}) => {
  const { votingValidator, validators } = useWalletVotes({ walletData });

  const includeResigned = useMemo<boolean>(() => {
    const votingValidatorIsPresent = validators.some(
      (validator) => validator.address === votingValidator?.address,
    );

    return !votingValidatorIsPresent && votingValidator !== undefined;
  }, [validators, votingValidator]);

  const validatorsIncludingResigned = useMemo<ValidatorItem[]>(() => {
    if (includeResigned) {
      return [votingValidator as ValidatorItem, ...validators];
    }

    return validators;
  }, [validators, votingValidator, includeResigned]);

  const filteredValidators = useMemo(() => {
    if (!searchTerm || searchTerm.length === 0) {
      return validatorsIncludingResigned;
    }

    const searchRegex = new RegExp(searchTerm, "i");

    return validatorsIncludingResigned
      .filter((validator) => validator.address.search(searchRegex) > -1)
      .slice(0, includeResigned ? 52 : 51);
  }, [searchTerm, validatorsIncludingResigned, includeResigned]);

  return (
    <ValidatorsList
      validators={filteredValidators}
      onChange={onChange}
      currentVote={votingValidator?.address}
    />
  );
};

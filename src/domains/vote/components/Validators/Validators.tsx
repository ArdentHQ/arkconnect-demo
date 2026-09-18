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

  const isIncludeResigned = useMemo<boolean>(() => {
    const isVotingValidatorIsPresent = validators.some(
      (validator) => validator.address === votingValidator?.address,
    );

    return !isVotingValidatorIsPresent && votingValidator !== undefined;
  }, [validators, votingValidator]);

  const validatorsIncludingResigned = useMemo<ValidatorItem[]>(() => {
    if (isIncludeResigned) {
      return [votingValidator as ValidatorItem, ...validators];
    }

    return validators;
  }, [validators, votingValidator, isIncludeResigned]);

  const filteredValidators = useMemo(() => {
    if (!searchTerm || searchTerm.length === 0) {
      return validatorsIncludingResigned;
    }

    const searchRegex = new RegExp(searchTerm, "i");

    return validatorsIncludingResigned
      .filter((validator) => {
        return (
          searchRegex.test(validator.address) ||
          (validator.username && searchRegex.test(validator.username))
        );
      })
      .slice(0, isIncludeResigned ? 54 : 53);
  }, [searchTerm, validatorsIncludingResigned, isIncludeResigned]);

  return (
    <ValidatorsList
      validators={filteredValidators}
      onChange={onChange}
      currentVote={votingValidator?.address}
    />
  );
};

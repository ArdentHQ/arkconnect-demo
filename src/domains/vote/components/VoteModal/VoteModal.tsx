import assert from "assert";
import { useTranslation } from "next-i18next";

import React, { useState } from "react";

import { BigNumber } from "bignumber.js";
import { useForm } from "react-hook-form";
import { Validators } from "@/domains/vote/components/Validators";
import { Dialog } from "@/app/components/Dialog";
import { Input } from "@/app/components/Input";
import { InputGroup } from "@/app/components/InputGroup";

import { useToasts } from "@/app/hooks/useToasts";
import { FeeInput } from "@/domains/transactions/components/SendModal/SendModal.blocks";
import { TransactionType } from "@/app/lib/Network";
import { useActiveWallet } from "@/app/hooks/useActiveWallet";

export interface VotingState {
  votes: string[];
  unvotes: string[];
}

export interface VoteInput {
  votes: string[];
  unvotes: string[];
  gasPrice: string;
  gasLimit: string;
}

export interface VoteType {
  amount: number;
  address: string;
}

export const VoteModal = ({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) => {
  const { t } = useTranslation();

  const { wallet, signVote } = useActiveWallet();

  const {
    register,
    formState: { errors, isValid },
    setValue,
    getValues,
  } = useForm<{
    gasPrice: BigNumber;
    gasLimit: BigNumber;
  }>({
    mode: "all",
    defaultValues: {
      gasPrice: BigNumber(0),
      gasLimit: BigNumber(0),
    },
  });

  const { showToast } = useToasts();

  const [voteState, setVoteState] = useState<VotingState>({
    votes: [],
    unvotes: [],
  });

  const [search, setSearch] = useState("");

  assert.ok(wallet);

  const handleSubmit = async () => {
    const voteInput: VoteInput = {
      votes: voteState.votes.length > 0 ? [voteState.votes[0]] : [],
      unvotes: voteState.unvotes.length > 0 ? [voteState.unvotes[0]] : [],
      gasPrice: getValues("gasPrice").toString(),
      gasLimit: getValues("gasLimit").toString(),
    };

    try {
      await signVote(voteInput);
      onClose();
      showToast({ message: t("common:CHANGES_REGISTERED"), type: "success" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      show={show}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={t("common:VOTE_FOR_VALIDATOR")}
      continueDisabled={
        (voteState.votes.length === 0 && voteState.unvotes.length === 0) ||
        !isValid
      }
    >
      <div className="flex flex-col space-y-4">
        <InputGroup>
          <Input
            placeholder={t("common:ENTER_VALIDATOR_NAME")}
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </InputGroup>

        <div className="h-96 max-h-full overflow-y-auto -mr-[14px] delegates-list-parent">
          <Validators
            walletData={wallet}
            onChange={({ votes, unvotes }) => {
              setVoteState({ votes, unvotes });
            }}
            searchTerm={search}
          />
        </div>

        <FeeInput
          register={register}
          setValue={setValue}
          errors={errors}
          gasPrice={getValues("gasPrice")}
          gasLimit={getValues("gasLimit")}
          wallet={wallet}
          className="pt-3"
          type={TransactionType.VOTE}
        />
      </div>
    </Dialog>
  );
};

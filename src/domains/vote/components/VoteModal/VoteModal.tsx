/* eslint-disable max-lines-per-function */
import assert from "assert";
import { useTranslation } from "next-i18next";

import React, { useState } from "react";

import { Delegates } from "@/domains/vote/components/Delegates";
import { Dialog } from "@/app/components/Dialog";
import { Input } from "@/app/components/Input";
import { InputGroup } from "@/app/components/InputGroup";

import { useToasts } from "@/app/hooks/useToasts";
import { useArkConnectContext } from "@/app/contexts/useArkConnectContext";

export interface VotingState {
  votes: string[];
  unvotes: string[];
}

export interface VoteInput {
  vote?: VoteType;
  unvote?: VoteType;
}

export interface VoteType {
  amount: number;
  delegateAddress: string;
}

export const VoteModal = ({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) => {
  const { t } = useTranslation("common");

  const { wallet, signVote } = useArkConnectContext();

  const { showToast } = useToasts();

  const [voteState, setVoteState] = useState<VotingState>({
    votes: [],
    unvotes: [],
  });

  const [search, setSearch] = useState("");

  assert(wallet);

  const handleSubmit = () => {
    const voteInput: VoteInput = {};

    if (voteState.votes.length > 0) {
      voteInput.vote = {
        amount: 0,
        delegateAddress: voteState.votes[0],
      };
    }

    if (voteState.unvotes.length > 0) {
      voteInput.unvote = {
        amount: 0,
        delegateAddress: voteState.unvotes[0],
      };
    }

    // eslint-disable-next-line promise/catch-or-return
    signVote(voteInput).then(() => {
      onClose();
      showToast({ message: t("CHANGES_REGISTERED"), type: "success" });
      return 0;
    });
  };

  return (
    <Dialog
      show={show}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={t("VOTE_FOR_DELEGATE")}
      continueDisabled={
        voteState.votes.length === 0 && voteState.unvotes.length === 0
      }
    >
      <div className="flex flex-col space-y-4">
        <InputGroup>
          <Input
            placeholder={t("ENTER_DELEGATE_NAME")}
            value={search}
            onChange={(event) => {
              setSearch(
                (event as React.ChangeEvent<HTMLInputElement>).target.value,
              );
            }}
          />
        </InputGroup>

        <div className="h-96 max-h-full overflow-y-auto -mr-[14px] delegates-list-parent">
          <Delegates
            walletData={wallet}
            onChange={({ votes, unvotes }) => {
              setVoteState({ votes, unvotes });
            }}
            searchTerm={search}
          />
        </div>
      </div>
    </Dialog>
  );
};

/* eslint-disable max-lines-per-function */
import assert from "assert";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { Dialog } from "@/app/components/Dialog";
import { InputGroup } from "@/app/components/InputGroup";
import { Input } from "@/app/components/Input";
import { useWallet } from "@/app/hooks";
import { Delegates } from "@/domains/vote/components/Delegates";

export interface VotingState {
  votes: string[];
  unvotes: string[];
}

export const VoteModal = ({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) => {
  const { t } = useTranslation("common");

  const { wallet, signVote } = useWallet();

  const [voteState, setVoteState] = useState<VotingState>({
    votes: [],
    unvotes: [],
  });

  assert(wallet);

  const handleSubmit = () => {
    const voteInput = {
      network: wallet.network,
      vote: {
        amount: 0,
        delegateAddress: voteState.votes[0],
      },
      unvote:
        voteState.unvotes.length > 0
          ? {
              amount: 0,
              delegateAddress: voteState.unvotes[0],
            }
          : undefined,
    };

    signVote(voteInput);
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
          <Input placeholder={t("ENTER_DELEGATE_NAME")} />
        </InputGroup>

        <div className="h-96 max-h-full overflow-y-auto -mr-[14px]">
          <Delegates
            walletData={wallet}
            onChange={({ votes, unvotes }) => {
              setVoteState({ votes, unvotes });
            }}
          />
        </div>
      </div>
    </Dialog>
  );
};

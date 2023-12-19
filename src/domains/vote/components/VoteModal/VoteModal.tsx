/* eslint-disable max-lines-per-function */
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

  const { wallet } = useWallet();

  const [voteState, setVoteState] = useState<VotingState>({
    votes: [],
    unvotes: [],
  });

  return (
    <Dialog
      show={show}
      onClose={onClose}
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
          {wallet && (
            <Delegates
              walletData={wallet}
              onChange={({ votes, unvotes }) => {
                setVoteState({ votes, unvotes });
              }}
            />
          )}
        </div>
      </div>
    </Dialog>
  );
};

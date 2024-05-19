/* eslint-disable max-lines-per-function */
import assert from "assert";
import { useTranslation } from "next-i18next";

import React, { useEffect, useState } from "react";

import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { Delegates } from "@/domains/vote/components/Delegates";
import { Dialog } from "@/app/components/Dialog";
import { Input } from "@/app/components/Input";
import { InputGroup } from "@/app/components/InputGroup";

import { useToasts } from "@/app/hooks/useToasts";
import { useArkConnectContext } from "@/app/contexts/useArkConnectContext";
import { FeeInput } from "@/domains/transactions/components/SendModal/SendModal.blocks";
import { TransactionType } from "@/app/lib/Network";

export interface VotingState {
  votes: string[];
  unvotes: string[];
}

export interface VoteInput {
  vote?: VoteType;
  unvote?: VoteType;
  fee: number;
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

  const { wallet, signVote } = useArkConnectContext();

  const {
    register,
    formState: { errors, isValid },
    setValue,
    getValues,
  } = useForm<{
    fee: string;
  }>({
    mode: "all",
    defaultValues: {
      fee: "0",
    },
  });

  const [feeInputProperties, setFeeInputProperties] = useState(
    {} as UseFormRegisterReturn,
  );

  useEffect(() => {
    const inputProperties = register("fee", {
      required: t("transactions:FEE_IS_REQUIRED"),
      min: {
        value: 0.000_000_01,
        message: t("transactions:FEE_TOO_LOW"),
      },
      max: {
        value: 1,
        message: t("transactions:FEE_TOO_HIGH"),
      },
      valueAsNumber: true,
      validate: (value) => {
        if (Number(value) > Number(wallet.balance ?? 0)) {
          return t("transactions:FEE_EXCEEDS_BALANCE");
        }
      },
    });

    setFeeInputProperties(inputProperties);
  }, [register, wallet]);

  const handleFeeChange = (value: string) => {
    setValue("fee", value, { shouldValidate: true });
  };

  const { showToast } = useToasts();

  const [voteState, setVoteState] = useState<VotingState>({
    votes: [],
    unvotes: [],
  });

  const [search, setSearch] = useState("");

  assert(wallet);

  const handleSubmit = () => {
    const voteInput: VoteInput = {
      fee: Number(getValues("fee")),
    };

    if (voteState.votes.length > 0) {
      voteInput.vote = {
        amount: 0,
        address: voteState.votes[0],
      };
    }

    if (voteState.unvotes.length > 0) {
      voteInput.unvote = {
        amount: 0,
        address: voteState.unvotes[0],
      };
    }

    // eslint-disable-next-line promise/catch-or-return
    signVote(voteInput).then(() => {
      onClose();
      showToast({ message: t("common:CHANGES_REGISTERED"), type: "success" });
      return 0;
    });
  };

  return (
    <Dialog
      show={show}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={t("common:VOTE_FOR_DELEGATE")}
      continueDisabled={
        (voteState.votes.length === 0 && voteState.unvotes.length === 0) ||
        !isValid ||
        getValues("fee") === "0"
      }
    >
      <div className="flex flex-col space-y-4">
        <InputGroup>
          <Input
            placeholder={t("common:ENTER_DELEGATE_NAME")}
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

        <FeeInput
          feeInputProperties={feeInputProperties}
          onFeeChange={handleFeeChange}
          error={errors.fee}
          network={wallet.network}
          className="pt-3"
          type={TransactionType.VOTE}
        />
      </div>
    </Dialog>
  );
};

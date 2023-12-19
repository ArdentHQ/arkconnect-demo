/* eslint-disable max-lines-per-function */
import assert from "assert";
import { useTranslation } from "next-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { Dialog } from "@/app/components/Dialog";
import { InputGroup } from "@/app/components/InputGroup";
import { Input } from "@/app/components/Input";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import ExternalLink from "@/public/icons/external-link.svg";
import {useState} from "react";

type FormSubmitHandler = SubmitHandler<{
  amount: string;
  receiverAddress: string;
}>;

export const VoteModal = ({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) => {
  const { t } = useTranslation("common");

  const votedDelegate: number = 2;

  const [selectedDelegate, setSelectedDelegate] = useState<number>(null);

  const getType = (id: number): VoteActionTypes => {
    if (votedDelegate === id && selectedDelegate === id) {
      return "current";
    }

    if (votedDelegate === id && selectedDelegate !== id) {
      return "unselected";
    }

    if (selectedDelegate === id) {
      return "selected"
    }

    return undefined;
  }

  return (
    <Dialog
      show={show}
      onClose={onClose}
      title={t("VOTE_FOR_DELEGATE")}
    >
      <div className="flex flex-col space-y-4">
        <InputGroup
        >
          <Input
            placeholder={t("ENTER_DELEGATE_NAME")}
          />
        </InputGroup>
        <div className="space-y-2">
          <Delegate rank={1} name={"Shahin"} explorerUrl="https://hello.com" action={getType(1)} onAction={(delegateId) => {
            setSelectedDelegate(delegateId)
          }/>

        </div>
      </div>
    </Dialog>
  );
};

interface DelegateProperties {
  rank: number;
  name: string;
  explorerUrl: string;
  action?: VoteActionTypes;
  onAction: (id: number) => void;
}

type VoteActionTypes = "selected" | "current" | "unselected" | undefined

const Delegate = ({rank, name, explorerUrl, action }: DelegateProperties) => {
  return (
    <div className="flex justify-between border rounded-lg px-4 py-3 border-theme-gray-200 items-center leading-5">
      <div className="flex space-x-5">
        <span>{rank}</span>
        <span>{name}</span>
      </div>
      <div className="">
        <a href={explorerUrl} className="h-5 w-8 flex items-center justify-center">
          <ExternalLink/>
        </a>
      </div>
      <button>{action}</button>
    </div>
  )
}

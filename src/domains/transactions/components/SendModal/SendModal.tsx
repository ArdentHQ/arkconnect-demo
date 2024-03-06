/* eslint-disable max-lines-per-function */
import assert from "assert";
import { useTranslation } from "next-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { Dialog } from "@/app/components/Dialog";
import { InputGroup } from "@/app/components/InputGroup";
import { Input } from "@/app/components/Input";
import { NetworkType, SignTransactionResponse } from "@/app/lib/Network";
import { useArkConnectContext } from "@/app/contexts/useArkConnectContext";
import cn from "classnames";

type FormSubmitHandler = SubmitHandler<{
  amount: string;
  receiverAddress: string;
}>;

export const SendModal = ({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) => {
  const { t } = useTranslation("transactions");

  const { wallet, signTransaction } = useArkConnectContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<{
    amount: string;
    receiverAddress: string;
  }>({
    mode: "all",
    defaultValues: {
      amount: "",
      receiverAddress: "",
    },
  });

  useEffect(
    () => () => {
      if (!show) {
        reset();
      }
    },
    [show, reset],
  );

  assert(wallet);

  const submitHandler: FormSubmitHandler = async ({
    amount,
    receiverAddress,
  }) => {
    try {
      // @TODO: handle success response
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response: SignTransactionResponse = await signTransaction({
        amount: Number(amount),
        receiverAddress,
        network: wallet.network,
      });

      onClose();
    } catch (error) {
      // @TODO: Handle wallet errors
      console.error(error);
    }
  };

  // @TODO: is this the best way to get the coin name?
  const coin = wallet.network === NetworkType.DEVNET ? "DARK" : "ARK";

  return (
    <Dialog
      show={show}
      onClose={onClose}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(submitHandler)}
      continueDisabled={!isValid}
      title={t("SEND_ARK")}
    >
      <div className="flex flex-col space-y-4">
        <InputGroup label={t("SENDER")}>
          <div className="relative inline-flex items-center flex-row-reverse">
            <span className="block px-2 py-1 rounded-lg bg-theme-gray-300 text-black text-sm font-medium absolute mr-3 pointer-events-none">
              {t("YOU", { ns: "common" })}
            </span>

            <Input className="w-full pr-16" value={wallet.address} disabled />
          </div>
        </InputGroup>

        <InputGroup
          label={t("RECIPIENT")}
          variant={errors.receiverAddress?.message ? "error" : undefined}
          help={errors.receiverAddress?.message}
        >
          <Input
            placeholder={t("ENTER_RECIPIENT")}
            {...register("receiverAddress", {
              required: t("RECIPIENT_REQUIRED"),
              validate: (value) => {
                // @TODO: add a better validation
                if (value.length !== 34) {
                  return t("INVALID_ADDRESS");
                }
              },
            })}
          />
        </InputGroup>

        <InputGroup
          label={
            <span className="inline-flex justify-between flex-1 w-full">
              <span>{t("AMOUNT", { ns: "common" })}</span>

              <span>
                <span className="text-theme-gray-400">{t("AVAILABLE")}</span>{" "}
                <span>{`${wallet.balance} ${coin}`}</span>
              </span>
            </span>
          }
          variant={errors.amount?.message ? "error" : undefined}
          help={errors.amount?.message}
        >
          <Input
            type="number"
            min="0"
            placeholder="Enter Amount"
            step="0.00000001"
            {...register("amount", {
              required: t("AMOUNT_REQUIRED"),
              min: {
                value: 0.000_000_01,
                message: t("AMOUNT_TOO_LOW"),
              },
              max: {
                value: Number(wallet.balance ?? 0),
                message: t("BALANCE_TOO_LOW"),
              },
            })}
          />
        </InputGroup>

        <FeeInput />
      </div>
    </Dialog>
  );
};

const FeeInput = () => {
  const [advancedView, showAdvancedView] = useState(false);

  return (
    <div className={cn("inline-flex flex-col space-y-1.5")}>
      <div className="flex justify-between">
        <label htmlFor="" className="text-sm font-medium text-theme-gray-500">
          Transaction Fee
        </label>

        <label className="inline-flex items-center cursor-pointer space-x-2">
          <input
            type="checkbox"
            checked={advancedView}
            className="sr-only peer"
            onChange={() => showAdvancedView(!advancedView)}
          />
          <span
            className={cn("ms-3 text-sm font-medium", {
              "text-theme-gray-900 dark:text-gray-300": !advancedView,
              "text-theme-gray-500": advancedView,
            })}
          >
            Simple
          </span>
          <div className="relative w-9 h-5 bg-theme-primary-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-theme-primary-700 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600"></div>
          <span
            className={cn("ms-3 text-sm font-medium", {
              "text-theme-gray-900 dark:text-gray-300": advancedView,
              "text-theme-gray-500": !advancedView,
            })}
          >
            Advanced
          </span>
        </label>
      </div>

      <div className="mt-1.5">
        {!advancedView && <SimpleFeeView />}
        {advancedView && <AdvancedFeeView />}
      </div>
    </div>
  );
};

const AdvancedFeeView = () => {
  return <p>advanced view</p>;
};

const SimpleFeeView = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-space-between space-y-1.5 sm:space-y-0 sm:space-x-1.5 flex-1">
      <FeeOption title="Slow" cryptoAmount={0.9875} fiatAmount={0.45} />
      <FeeOption
        title="Average"
        cryptoAmount={0.9875}
        fiatAmount={0.45}
        isSelected={true}
      />
      <FeeOption title="Fast" cryptoAmount={0.9875} fiatAmount={0.45} />
    </div>
  );
};

const FeeOption = ({
  title,
  cryptoAmount,
  fiatAmount,
  isSelected,
}: {
  title: number;
  cryptoAmount: number;
  fiatAmount: number;
  isSelected?: boolean;
}) => {
  return (
    <button
      className={cn(
        "flex flex-row sm:flex-col flex-1 space-x-1 sm:space-x-0 items-center border p-3 rounded-md",
        {
          "border-theme-primary-700 bg-theme-primary-50": isSelected,
          "border-theme-gray-400 hover:border-black hover:bg-theme-gray-50":
            !isSelected,
        },
      )}
    >
      <span className="flex flex-row sm:flex-col justify-between flex-1 items-center sm:pb-2">
        <span className="font-medium pb-1 leading-5"> {title} </span>
        <span className="leading-4.5"> {cryptoAmount} ARK </span>
      </span>
      <span className="text-theme-gray-500 font-medium leading-4.5">
        ${fiatAmount}{" "}
      </span>
    </button>
  );
};

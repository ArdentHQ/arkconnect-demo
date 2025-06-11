/* eslint-disable max-lines-per-function */
import assert from "assert";
import { useTranslation } from "next-i18next";
import { SubmitHandler, useForm, UseFormRegisterReturn } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { BigNumber } from "bignumber.js";
import {Address, isAddress} from "viem";
import { Dialog } from "@/app/components/Dialog";
import { InputGroup } from "@/app/components/InputGroup";
import { Input, NumericInput } from "@/app/components/Input";
import { SignTransactionResponse, TransactionType } from "@/app/lib/Network";
import { useArkConnectContext } from "@/app/contexts/useArkConnectContext";
import {
  FeeInput,
  validateBalance,
} from "@/domains/transactions/components/SendModal/SendModal.blocks";
import { getNetworkCoin } from "@/app/utils/network";
import { useActiveWallet } from "@/app/hooks/useActiveWallet";

interface FormValues {
  amount: string;
  receiverAddress: string;
  gasPrice: BigNumber;
  gasLimit: BigNumber;
}

type FormSubmitHandler = SubmitHandler<FormValues>;

export const SendModal = ({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) => {
  const { t } = useTranslation("transactions");

  const { wallet, signTransaction } = useActiveWallet();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    trigger,
    getValues,
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      amount: "",
      receiverAddress: "",
      gasPrice: BigNumber(0),
      gasLimit: BigNumber(0),
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
    gasPrice,
    gasLimit,
  }) => {
    try {
      await signTransaction({
        value: amount,
        to: receiverAddress as Address,
        gasPrice: gasPrice.toString(),
        gasLimit: gasLimit.toString(),
      });

      onClose();
    } catch (error) {
      // @TODO: Handle wallet errors
      console.error(error);
    }
  };

  // @TODO: is this the best way to get the coin name?
  const coin = getNetworkCoin(wallet.network);

  const [amountInputProperties, setAmountInputProperties] = useState<
    UseFormRegisterReturn | undefined
  >(undefined);

  useEffect(() => {
    const inputAmountProperties = register("amount", {
      required: t("AMOUNT_REQUIRED"),
      min: {
        value: 0.000_000_01,
        message: t("AMOUNT_TOO_LOW"),
      },
      max: {
        value: Number(wallet.balance ?? 0),
        message: t("BALANCE_TOO_LOW"),
      },
      validate: (value, formValues) => {
        return validateBalance(
          formValues,
          t("FEE_AND_AMOUNT_EXCEEDS_BALANCE"),
          wallet.balance,
        );
      },
      deps: ["gasPrice", "gasLimit"],
    });

    setAmountInputProperties(inputAmountProperties);
  }, [register, wallet]);

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
            <span className="block px-2 py-1 rounded-lg bg-theme-gray-300 text-black text-sm font-medium absolute mr-3 pointer-events-none dark:text-theme-gray-400 dark:bg-theme-gray-700">
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
                if (!isAddress(value)) {
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

              <span className="text-theme-gray-400 text-sm">
                <span>{t("AVAILABLE")}</span>{" "}
                <span className="text-theme-gray-500 dark:text-theme-gray-400">{`${wallet.balance} ${coin}`}</span>
              </span>
            </span>
          }
          variant={errors.amount?.message ? "error" : undefined}
          help={errors.amount?.message}
        >
          <NumericInput
            id="amount"
            placeholder="Enter Amount"
            onValueChange={(value: string) => {
              setValue("amount", value || "", {
                shouldValidate: true,
                shouldTouch: true,
                shouldDirty: true,
              });
              void trigger("amount");
            }}
            inputFormProperties={amountInputProperties}
          />
        </InputGroup>

        <FeeInput
          register={register}
          setValue={setValue}
          gasPrice={getValues("gasPrice")}
          gasLimit={getValues("gasLimit")}
          errors={errors}
          wallet={wallet}
          type={TransactionType.TRANSFER}
        />
      </div>
    </Dialog>
  );
};

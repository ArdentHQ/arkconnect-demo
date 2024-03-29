/* eslint-disable max-lines-per-function */
import assert from "assert";
import { useTranslation } from "next-i18next";
import { SubmitHandler, useForm, UseFormRegisterReturn } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { Dialog } from "@/app/components/Dialog";
import { InputGroup } from "@/app/components/InputGroup";
import { Input } from "@/app/components/Input";
import { NetworkType, SignTransactionResponse } from "@/app/lib/Network";
import { useArkConnectContext } from "@/app/contexts/useArkConnectContext";
import { FeeInput } from "@/domains/transactions/components/SendModal/SendModal.blocks";
import { getNetworkCoin } from "@/app/utils/network";

type FormSubmitHandler = SubmitHandler<{
  amount: string;
  receiverAddress: string;
  fee: string;
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
    setValue,
    trigger,
    getValues,
    getFieldState,
  } = useForm<{
    amount: string;
    receiverAddress: string;
    fee: string;
  }>({
    mode: "all",
    defaultValues: {
      amount: "",
      receiverAddress: "",
      fee: "0",
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
    fee,
  }) => {
    try {
      // @TODO: handle success response
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response: SignTransactionResponse = await signTransaction({
        amount: Number(amount),
        receiverAddress,
        fee: Number(fee),
      });

      onClose();
    } catch (error) {
      // @TODO: Handle wallet errors
      console.error(error);
    }
  };

  // @TODO: is this the best way to get the coin name?
  const coin = getNetworkCoin(wallet.network);

  const [feeInputProperties, setFeeInputProperties] = useState<
    UseFormRegisterReturn | undefined
  >(undefined);

  useEffect(() => {
    const inputProperties = register("fee", {
      required: t("FEE_IS_REQUIRED"),
      min: {
        value: 0.000_000_01,
        message: t("FEE_TOO_LOW"),
      },
      max: {
        value: 1,
        message: t("FEE_TOO_HIGH"),
      },
      valueAsNumber: true,
      validate: (value, formValues) => {
        if (formValues.amount !== "") {
          return true;
        }

        if (
          Number(value) + Number(formValues.amount) >
          Number(wallet.balance ?? 0)
        ) {
          return t("FEE_EXCEEDS_BALANCE");
        }
      },
      deps: ["amount"],
    });

    setFeeInputProperties(inputProperties);
  }, [register, wallet]);

  const handleFeeChange = (value: string) => {
    setValue("fee", value, {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    });
    getValues("amount") && void trigger("amount");
  };

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

              <span className="text-theme-gray-400 text-sm">
                <span>{t("AVAILABLE")}</span>{" "}
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
              validate: (value, formValues) => {
                if (
                  Number(value) + Number(formValues.fee) >
                  Number(wallet.balance ?? 0)
                ) {
                  return t("FEE_AND_AMOUNT_EXCEEDS_BALANCE");
                }
              },
              deps: ["fee"],
            })}
          />
        </InputGroup>

        <FeeInput
          feeInputProperties={feeInputProperties}
          onFeeChange={handleFeeChange}
          error={errors.fee}
          network={wallet.network}
        />
      </div>
    </Dialog>
  );
};

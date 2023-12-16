/* eslint-disable max-lines-per-function */
import assert from "assert";
import { useTranslation } from "next-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { Dialog } from "@/app/components/Dialog";
import { InputGroup } from "@/app/components/InputGroup";
import { Input } from "@/app/components/Input";
import { useWallet } from "@/app/hooks";
import { NetworkType, SignTransactionResponse } from "@/app/lib";

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

  const { wallet, signTransaction } = useWallet();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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

  assert(wallet);

  const submitHandler: FormSubmitHandler = async ({
    amount,
    receiverAddress,
  }) => {
    try {
      const response: SignTransactionResponse = await signTransaction({
        amount: Number(amount),
        receiverAddress,
        network: "Devnet",
      });

      // @TODO: handle success response
      console.log("Success", response);

      onClose();
    } catch (error) {
      // @TODO: Handle wallet errors
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

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
                value: 0,
                message: t("AMOUNT_TOO_LOW"),
              },
              max: {
                value: Number(wallet.balance ?? 0),
                message: t("BALANCE_TOO_LOW"),
              },
            })}
          />
        </InputGroup>
      </div>
    </Dialog>
  );
};

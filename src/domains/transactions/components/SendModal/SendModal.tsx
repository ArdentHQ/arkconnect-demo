import assert from "assert";
import { useTranslation } from "next-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { Dialog } from "@/app/components/Dialog";
import { InputGroup } from "@/app/components/InputGroup";
import { Input } from "@/app/components/Input";
import { useWallet } from "@/app/hooks";
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
    amount?: number;
    receiverAddress: string;
  }>({
    defaultValues: {
      amount: undefined,
      receiverAddress: "",
    },
  });

  assert(wallet);

  const submitHandler: SubmitHandler<{
    amount?: number | undefined;
    receiverAddress: string;
  }> = async ({ amount, receiverAddress }) => {
    console.log({ amount, receiverAddress });
  };

  return (
    <Dialog
      show={show}
      onClose={onClose}
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
            {...register("receiverAddress")}
          />
        </InputGroup>

        <InputGroup
          label={
            <span className="inline-flex justify-between flex-1 w-full">
              <span>{t("AMOUNT", { ns: "common" })}</span>

              <span>
                <span className="text-theme-gray-400">{t("AVAILABLE")}</span>{" "}
                <span>{`${wallet.balance} ARK`}</span>
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
            {...register("amount")}
          />
        </InputGroup>
      </div>
    </Dialog>
  );
};

import assert from "assert";
import { useTranslation } from "next-i18next";
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

  const { wallet } = useWallet();

  assert(wallet);

  return (
    <Dialog
      show={show}
      onClose={onClose}
      onContinue={() => console.log("Continue")}
      continueDisabled={true}
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
          variant="error"
          help={t("RECIPIENT_INVALID_ADDRESS")}
        >
          <Input placeholder={t("ENTER_RECIPIENT")} />
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
          variant="error"
          help={t("BALANCE_TOO_LOW")}
        >
          <Input placeholder="Enter Amount" />
        </InputGroup>
      </div>
    </Dialog>
  );
};

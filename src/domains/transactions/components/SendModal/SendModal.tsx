import { useTranslation } from "next-i18next";
import { Dialog } from "@/app/components/Dialog";
import { InputGroup } from "@/app/components/InputGroup";
import { Input } from "@/app/components/Input";

export const SendModal = ({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) => {
  const { t } = useTranslation("transactions");

  return (
    <Dialog
      show={show}
      onClose={onClose}
      onContinue={() => console.log("Continue")}
      continueDisabled={true}
      title={t("SEND_ARK")}
    >
      <div className="flex flex-col space-y-4">
        <InputGroup label="Sender">
          <div className="relative inline-flex items-center flex-row-reverse">
            <span className="block px-2 py-1 rounded-lg bg-theme-gray-300 text-black text-sm font-medium absolute mr-3 pointer-events-none">
              {"You"}
            </span>

            <Input
              className="w-full pr-16"
              value="AGURf8NdhVj4fvz5mK39qMgPoLGPgJNBrc"
              disabled
            />
          </div>
        </InputGroup>

        <InputGroup label="Recipient">
          <Input placeholder="Enter Recipient" />
        </InputGroup>

        <InputGroup label="Amount">
          <Input placeholder="Enter Amount" />
        </InputGroup>
      </div>
    </Dialog>
  );
};

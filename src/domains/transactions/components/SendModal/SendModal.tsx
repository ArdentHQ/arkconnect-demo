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
          <Input value="AGURf8NdhVj4fvz5mK39qMgPoLGPgJNBrc" disabled />
        </InputGroup>
      </div>
    </Dialog>
  );
};

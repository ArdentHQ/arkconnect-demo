import { useTranslation } from "next-i18next";
import { Dialog } from "@/app/components/Dialog";

export const SendForm = ({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <Dialog
      show={show}
      onClose={onClose}
      onContinue={() => console.log("Continue")}
      continueDisabled={true}
      title="Send ARK"
    >
      {"TBD"}
    </Dialog>
  );
};

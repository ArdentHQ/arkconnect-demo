import { useTranslation } from "next-i18next";
import { Dialog } from "@/app/components/Dialog";

export const SendForm = ({
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
      {"TBD"}
    </Dialog>
  );
};

import { Dialog as HeadlessDialog } from "@headlessui/react";
import { FormEventHandler } from "react";
import { ModalProperties, Modal } from "@/app/components/Modal";
import X from "@/public/icons/x.svg";
import { Button } from "@/app/components/Button";

interface Properties extends ModalProperties {
  title: string;
  closeButtonLabel?: string;
  continueButtonLabel?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  continueDisabled?: boolean;
}

export const Dialog = ({
  title,
  children,
  onClose,
  closeButtonLabel = "Close",
  continueButtonLabel = "Continue",
  continueDisabled = false,
  onSubmit,
  ...modalProperties
}: Properties): JSX.Element => {
  return (
    <Modal {...modalProperties} onClose={onClose}>
      <form onSubmit={onSubmit} className="flex flex-col">
        <div className="bg-theme-gray-100 flex justify-between items-center px-10 py-5">
          <HeadlessDialog.Title className=" text-xl text-black font-medium">
            {title}
          </HeadlessDialog.Title>

          <button type="button" className="text-black" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-10 pt-4 pb-10 flex flex-col">
          <div>{children}</div>

          <div className="flex space-x-3 justify-end mt-4">
            <Button
              variant="secondary"
              className="flex-1 sm:flex-none"
              onClick={onClose}
            >
              <span className="text-center w-full">{closeButtonLabel}</span>
            </Button>
            <Button
              type="submit"
              className="flex-1 sm:flex-none"
              disabled={continueDisabled}
            >
              <span className="text-center w-full">{continueButtonLabel}</span>
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

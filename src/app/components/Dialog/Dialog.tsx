import { Dialog as HeadlessDialog } from "@headlessui/react";
import { ModalProperties, Modal } from "@/app/components/Modal";
import X from "@/public/icons/x.svg";
import { Button } from "@/app/components/Button";

interface Properties extends ModalProperties {
  title: string;
  closeButtonLabel?: string;
  okButtonLabel?: string;
  onOk?: () => void;
}

export const Dialog = ({
  title,
  children,
  onClose,
  closeButtonLabel = "Close",
  okButtonLabel = "Ok",
  onOk,
  ...modalProperties
}: Properties): JSX.Element => {
  return (
    <Modal {...modalProperties} onClose={onClose}>
      <div className="flex flex-col">
        <div className="bg-[#F5F5F5] flex justify-between items-center px-10 py-5">
          <HeadlessDialog.Title className=" text-xl text-[#2E2E2E] font-medium">
            {title}
          </HeadlessDialog.Title>

          <button type="button" className="text-[#2E2E2E]" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-10 pt-4 pb-10 flex flex-col">
          <div>{children}</div>
          <div className="flex space-x-3 justify-end">
            <Button onClick={onClose}>{closeButtonLabel}</Button>
            <Button onClick={onOk}>{okButtonLabel}</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

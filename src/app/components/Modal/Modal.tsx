import { Dialog, Transition } from "@headlessui/react";
import cn from "classnames";

import { Fragment, useEffect } from "react";

import { useModalContext } from "@/app/contexts/ModalContext/ModalContext";
import { useAppFont } from "@/app/hooks/useAppFont";

export interface ModalProperties {
  children?: React.ReactNode;
  show?: boolean;
  onClose: () => void;
  initialFocus?: React.MutableRefObject<HTMLElement | null>;
}

export const Modal = ({
  children,
  show = false,
  onClose,
  initialFocus,
}: ModalProperties): JSX.Element => {
  const { setModalOpened } = useModalContext();

  const fontCssClass = useAppFont();

  useEffect(() => {
    setModalOpened(show);
  }, [show, setModalOpened]);

  return (
    <Transition show={show} as={Fragment} leave="duration-200">
      <Dialog
        as="div"
        id="modal"
        className={`fixed inset-0 z-50 flex transform items-center overflow-y-auto px-4 py-6 transition-all sm:px-0 ${fontCssClass}`}
        onClose={onClose}
        initialFocus={initialFocus}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0 bg-[rgba(20,20,20,0.15)]" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <Dialog.Panel
            className={cn(
              "transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:mx-auto w-full max-w-lg",
            )}
          >
            {children}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

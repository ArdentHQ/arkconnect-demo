import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import cn from "classnames";

import { Fragment, ReactElement, useEffect } from "react";

export interface ModalProperties {
  children?: React.ReactNode;
  show?: boolean;
  onClose: () => void;
  initialFocus?: React.RefObject<HTMLElement | null>;
}

export const Modal = ({
  children,
  show = false,
  onClose,
  initialFocus,
}: ModalProperties): ReactElement => {
  useEffect(() => {
    const wrapper = document.querySelector("#layout") as HTMLDivElement;
    wrapper.classList.toggle("blur-sm", show);
  }, [show]);

  return (
    <Transition show={show} as={Fragment} leave="duration-200">
      <Dialog
        as="div"
        id="modal"
        className="fixed inset-0 z-50 flex transform sm:items-center overflow-y-auto sm:py-6 transition-all items-start"
        onClose={onClose}
        initialFocus={initialFocus}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0 z-0 bg-[rgba(20,20,20,0.15)]" />
        </TransitionChild>

        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <DialogPanel
            className={cn(
              "relative z-10 transform overflow-hidden sm:rounded-lg bg-white shadow-xl transition-all sm:mx-auto w-full sm:max-w-lg dark:bg-base-black dark:border-2 dark:border-theme-gray-700",
            )}
          >
            {children}
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
};

import { Transition } from "@headlessui/react";
import cn from "classnames";
import { forwardRef, Fragment } from "react";
import { ToastCloseButton } from "./Toast.blocks";
import {
  type ToastProperties,
  type ToastTemplateProperties,
} from "./Toast.contracts";

export const Toast = forwardRef<HTMLDivElement, ToastProperties>(
  (
    {
      className,
      title: toastTitle,
      type = "info",
      message,
      isStatic = false,
      isExpanded = false,
      onClose,
      ...properties
    }: ToastProperties,
    reference,
  ): JSX.Element => {
    const title = "title";

    return (
      <div
        data-testid="Toast"
        aria-live="assertive"
        role="alert"
        {...properties}
        className={cn("overflow-hidden rounded-xl", className)}
        ref={reference}
      >
        <div
          data-testid="Toast__wrapper"
          className={cn("flex justify-between font-medium", {
            "bg-theme-gray-200 text-theme-secondary-700 dark:bg-theme-dark-700 dark:text-theme-dark-100":
              type === "pending",
            "bg-theme-success-100 text-theme-success-700 dark:bg-theme-success-500 dark:text-white":
              type === "success",
            "bg-theme-warning-100 text-theme-warning-800 dark:bg-theme-warning-700 dark:text-white":
              type === "warning",
            "bg-theme-danger-100 text-theme-danger-700 dark:bg-theme-danger-400 dark:text-white":
              type === "error",
            "bg-theme-hint-100 text-theme-hint-700 dark:bg-theme-primary-600 dark:text-white":
              type === "info",
          })}
        >
          <div className="flex items-center space-x-2 px-6 py-3">
            <p>{isExpanded ? toastTitle ?? title : message}</p>
          </div>

          {((isStatic && onClose !== undefined) || !isStatic) && (
            <ToastCloseButton type={type} onClick={onClose} />
          )}
        </div>

        {isExpanded && (
          <div
            className={cn(
              "px-6 py-3 text-sm font-medium leading-6 dark:bg-theme-dark-800 dark:text-theme-dark-200",
              {
                "bg-theme-secondary-100 text-theme-secondary-700":
                  type === "pending",
                "bg-theme-success-50 text-theme-secondary-700":
                  type === "success",
                "bg-theme-warning-50 text-theme-secondary-700":
                  type === "warning",
                "bg-theme-danger-50 text-theme-secondary-700": type === "error",
                "bg-theme-primary-50 text-theme-secondary-700": type === "info",
              },
            )}
          >
            {message}
          </div>
        )}
      </div>
    );
  },
);

export const ToastTemplate = ({
  isVisible,
  toastMessage,
  onClose,
}: ToastTemplateProperties): JSX.Element => (
  <Transition
    appear={true}
    as={Fragment}
    show={isVisible}
    leave="transition ease-in duration-150"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <Toast
      className="w-full max-w-md"
      title={toastMessage.title}
      message={toastMessage.message}
      type={toastMessage.type}
      isExpanded={toastMessage.isExpanded}
      isStatic={toastMessage.isStatic}
      isLoading={toastMessage.isLoading}
      onClose={onClose}
    />
  </Transition>
);

Toast.displayName = "Toast";

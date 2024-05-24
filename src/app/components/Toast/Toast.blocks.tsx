import cn from "classnames";
import { type MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { type ToastType } from "./Toast.contracts";
import X from "@/public/icons/x.svg";

export const ToastCloseButton = ({
  type,
  onClick,
}: {
  type: ToastType;
  onClick: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element => {
  const { t } = useTranslation();

  return (
    <button
      data-testid="CloseButton"
      type="button"
      onClick={onClick}
      className={cn("transition-default px-5", {
        "hover:bg-theme-secondary-300 hover:text-theme-secondary-800 dark:hover:bg-theme-dark-700 dark:hover:text-theme-dark-50":
          type === "pending",
        "hover:bg-theme-success-200 hover:text-theme-success-800 dark:hover:bg-theme-success-600 dark:hover:text-white":
          type === "success",
        "hover:bg-theme-warning-200 hover:text-theme-warning-900 dark:hover:bg-theme-warning-800 dark:hover:text-white":
          type === "warning",
        "hover:bg-theme-danger-200 hover:text-theme-danger-800 dark:hover:bg-theme-danger-300 dark:hover:text-white":
          type === "error",
        "hover:bg-theme-primary-200 hover:text-theme-primary-800 dark:hover:bg-theme-primary-600 dark:hover:text-white":
          type === "info",
      })}
    >
      <span className="sr-only">{t("CLOSE_TOAST")}</span>

      <span>
        <X className="w-5 h-5" />
      </span>
    </button>
  );
};

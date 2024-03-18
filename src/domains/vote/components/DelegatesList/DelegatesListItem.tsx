import classNames from "classnames";
import { useTranslation } from "next-i18next";
import { DelegateItem } from "@/app/lib/Delegates";
import ExternalLink from "@/public/icons/external-link.svg";
import { Link } from "@/app/components/Link";
import { TruncateMiddle } from "@/app/components/Truncate";
import { Label } from "@/app/components/Label";

export const DelegatesListItem = ({
  isSelected = false,
  isUnselected = false,
  isCurrent = false,
  isResigned = false,
  delegate,
  onSelect,
  onDeselect,
  onUnselect,
  onCurrent,
}: {
  delegate: DelegateItem;
  isSelected?: boolean;
  isUnselected?: boolean;
  isCurrent?: boolean;
  isResigned?: boolean;
  onSelect?: (address: string) => void;
  onDeselect?: (address: string) => void;
  onUnselect?: (address: string) => void;
  onCurrent?: (address: string) => void;
}) => {
  const { t } = useTranslation();

  const isDefault = !isSelected && !isUnselected && !isCurrent;
  const isOnlyCurrent = !isSelected && !isUnselected && isCurrent;
  const isOnlySelected = isSelected && !isUnselected && !isCurrent;

  const handleOnSelect = () => {
    if (isDefault) {
      onSelect?.(delegate.address);
      return;
    }

    if (isOnlySelected) {
      onDeselect?.(delegate.address);
      return;
    }

    if (isOnlyCurrent) {
      onUnselect?.(delegate.address);
    }

    if (isUnselected) {
      onCurrent?.(delegate.address);
    }
  };

  return (
    <div
      className={classNames(
        "flex items-center w-full justify-between py-3 px-4 rounded-lg border",
        {
          "border-theme-primary-700 bg-theme-primary-50 dark:border-theme-primary-650 dark:bg-theme-primary-650/10":
            isOnlyCurrent || isOnlySelected,
          "border-theme-error-600 bg-theme-error-50 dark:border-theme-error-500 dark:bg-theme-error-500/[15%]":
            isUnselected,
          "border-theme-gray-200 dark:border-theme-gray-700 dark:bg-base-black":
            isDefault,
        },
      )}
    >
      <div className="text-md text-black font-normal leading-[125%] w-8 dark:text-white">
        {isResigned ? (
          <span className="text-theme-gray-400 font-medium text-sm">-</span>
        ) : (
          delegate.rank
        )}
      </div>

      <div className="w-2/4 flex items-center overflow-auto">
        <div className="text-md text-black font-normal leading-[125%] overflow-hidden flex-1 dark:text-white">
          <TruncateMiddle>{delegate.username}</TruncateMiddle>
        </div>

        {!isResigned && (
          <Label variant="danger" className="flex-shrink-0 text-xs ml-auto">
            {t("RESIGNED")}
          </Label>
        )}
      </div>

      <div className="text-center">
        <Link href={delegate.explorerUrl} target="_blank">
          <ExternalLink className="w-4" />
        </Link>
      </div>

      <div className="w-20 text-right">
        <Link
          href="#"
          target="_blank"
          className={classNames("font-bold", {
            "text-theme-error-600 hover:text-theme-error-700 dark:text-theme-error-500":
              isUnselected,
          })}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            handleOnSelect();
          }}
        >
          {isOnlySelected && t("SELECTED")}
          {isOnlyCurrent && t("CURRENT")}
          {isUnselected && t("UNSELECTED")}
          {isDefault && t("SELECT")}
        </Link>
      </div>
    </div>
  );
};

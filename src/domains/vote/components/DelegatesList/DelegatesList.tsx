import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DelegatesListItem } from "./DelegatesListItem";
import { DelegatesListProperties } from "./contracts";
import { isTruthy } from "@/app/utils/isTruthy";

export const DelegatesList = ({
  delegates,
  onChange,
  currentVote,
}: DelegatesListProperties) => {
  const [selected, setSelected] = useState<string>();
  const [unselected, setUnselected] = useState<string>();
  const { t } = useTranslation("common");

  if (delegates.length === 0) {
    return (
      <div className="w-full text-base font-normal leading-[1.25rem] text-center text-theme-gray-500 dark:text-theme-gray-300">
        {t("NO_DELEGATES_FOUND")}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {delegates.map((delegate) => {
        return (
          <DelegatesListItem
            key={delegate.address}
            delegate={delegate}
            isSelected={selected === delegate.address}
            isCurrent={currentVote === delegate.address}
            isUnselected={unselected === delegate.address}
            isResigned={delegate.isResigned}
            onSelect={(address) => {
              setSelected(address);

              if (isTruthy(currentVote)) {
                setUnselected(currentVote);
                onChange?.({ votes: [address], unvotes: [currentVote] });
                return;
              }

              if (isTruthy(unselected)) {
                onChange?.({ votes: [address], unvotes: [unselected] });
                return;
              }

              onChange?.({ votes: [address], unvotes: [] });
            }}
            onDeselect={() => {
              setSelected(undefined);

              if (isTruthy(unselected)) {
                setUnselected(undefined);
              }

              onChange?.({ votes: [], unvotes: [] });
            }}
            onUnselect={(address) => {
              setUnselected(address);

              if (currentVote) {
                onChange?.({ votes: [], unvotes: [currentVote] });
              }
            }}
            onCurrent={(address) => {
              setSelected(undefined);
              setUnselected(undefined);
              onChange?.({ votes: [address], unvotes: [] });
            }}
          />
        );
      })}
    </div>
  );
};

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ValidatorsListItem } from "./ValidatorsListItem";
import { ValidatorsListProperties } from "./contracts";
import { isTruthy } from "@/app/utils/isTruthy";

export const ValidatorsList = ({
  validators,
  onChange,
  currentVote,
}: ValidatorsListProperties) => {
  const [selected, setSelected] = useState<string>();
  const [unselected, setUnselected] = useState<string>();
  const { t } = useTranslation("common");

  if (validators.length === 0) {
    return (
      <div className="w-full text-base font-normal leading-[1.25rem] text-center text-theme-gray-500 dark:text-theme-gray-300">
        {t("NO_VALIDATORS_FOUND")}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {validators.map((validator) => {
        return (
          <ValidatorsListItem
            key={validator.address}
            validator={validator}
            isSelected={selected === validator.address}
            isCurrent={currentVote === validator.address}
            isUnselected={unselected === validator.address}
            isResigned={validator.isResigned}
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

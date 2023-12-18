import { useState } from "react";
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
            onSelect={(address) => {
              setSelected(address);

              if (isTruthy(currentVote)) {
                setUnselected(currentVote);
                // setCurrent(undefined);
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
                // setCurrent(unselected);
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
              // setCurrent(address);
              onChange?.({ votes: [address], unvotes: [] });
            }}
          />
        );
      })}
    </div>
  );
};

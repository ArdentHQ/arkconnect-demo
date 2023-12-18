import { DelegatesListItem } from "./DelegatesListItem";
import { useState } from "react";
import { isTruthy } from "@/app/utils/isTruthy";
import { DelegatesListProperties } from "./contracts";

export const DelegatesList = ({
  delegates,
  onChange,
  currentVote,
}: DelegatesListProperties) => {
  const [current, setCurrent] = useState<string | undefined | null>(
    currentVote ?? null,
  );
  const [selected, setSelected] = useState<string>();
  const [unselected, setUnselected] = useState<string>();

  const initialVote = current === null ? currentVote : current;

  return (
    <div className="space-y-2">
      {delegates.map((delegate) => {
        return (
          <DelegatesListItem
            key={delegate.address}
            delegate={delegate}
            isSelected={selected === delegate.address}
            isCurrent={initialVote === delegate.address}
            isUnselected={unselected === delegate.address}
            onSelect={(address) => {
              setSelected(address);

              if (isTruthy(current)) {
                setUnselected(current);
                setCurrent(undefined);
                onChange?.({ votes: [address], unvotes: [current] });
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
                setCurrent(unselected);
                setUnselected(undefined);
              }

              onChange?.({ votes: [], unvotes: [] });
            }}
            onUnselect={(address) => {
              setUnselected(address);

              if (current) {
                onChange?.({ votes: [], unvotes: [current] });
                return;
              }
            }}
            onCurrent={(address) => {
              setSelected(undefined);
              setUnselected(undefined);
              setCurrent(address);
              onChange?.({ votes: [address], unvotes: [] });
            }}
          />
        );
      })}
    </div>
  );
};

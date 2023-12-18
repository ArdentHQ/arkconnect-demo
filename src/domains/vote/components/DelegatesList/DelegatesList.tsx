import { DelegatesListItem } from "./DelegatesListItem";
import { useState } from "react";
import { isTruthy } from "@/app/utils/isTruthy";
import { DelegatesListProperties } from "./contracts";

export const DelegatesList = ({
  delegates,
  onChange,
}: DelegatesListProperties) => {
  const [current, setCurrent] = useState<string | null>();
  const [selected, setSelected] = useState<string | null>(null);
  const [unselected, setUnselected] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {delegates.map((delegate) => {
        return (
          <DelegatesListItem
            key={delegate.address}
            delegate={delegate}
            isSelected={selected === delegate.address}
            isCurrent={current === delegate.address}
            isUnselected={unselected === delegate.address}
            onSelect={(address) => {
              setSelected(address);

              if (isTruthy(current)) {
                setUnselected(current);
                setCurrent(null);
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
              setSelected(null);

              if (isTruthy(unselected)) {
                setCurrent(unselected);
                setUnselected(null);
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
              setSelected(null);
              setUnselected(null);
              setCurrent(address);
              onChange?.({ votes: [address], unvotes: [] });
            }}
          />
        );
      })}
    </div>
  );
};

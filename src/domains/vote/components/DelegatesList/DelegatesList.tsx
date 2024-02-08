import { useMemo, useState } from "react";
import { DelegatesListItem } from "./DelegatesListItem";
import { DelegatesListProperties } from "./contracts";
import { isTruthy } from "@/app/utils/isTruthy";
import { DelegateItem } from "@/app/lib/Delegates";

export const DelegatesList = ({
  delegates,
  onChange,
  votingDelegate,
}: DelegatesListProperties) => {
  const [selected, setSelected] = useState<string>();
  const [unselected, setUnselected] = useState<string>();

  const currentVote = votingDelegate?.address;

  const list = useMemo<DelegateItem[]>(() => {
    const votingDelegateIsPresent = delegates.some(
      (delegate) => delegate.address === votingDelegate?.address,
    );

    if (votingDelegateIsPresent || !votingDelegate) {
      return delegates;
    }

    return [votingDelegate, ...delegates];
  }, [delegates, votingDelegate]);

  return (
    <div className="space-y-2">
      {list.map((delegate) => {
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

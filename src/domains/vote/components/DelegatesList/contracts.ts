import { DelegateItem } from "@/app/lib/Delegates";

export interface DelegatesListProperties {
  delegates: DelegateItem[];
  votingDelegate?: DelegateItem;
  onChange?: ({
    votes,
    unvotes,
  }: {
    votes: string[];
    unvotes: string[];
  }) => void;
}

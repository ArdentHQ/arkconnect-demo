import { DelegateItem } from "@/app/lib/Delegates";

export interface DelegatesListProperties {
  delegates: DelegateItem[];
  currentVote?: string;
  onChange?: ({
    votes,
    unvotes,
  }: {
    votes: string[];
    unvotes: string[];
  }) => void;
}

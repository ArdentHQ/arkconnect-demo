import { DelegateData } from "@/app/lib/Delegates";

export interface DelegatesListProperties {
  delegates: DelegateData[];
  currentVote?: string;
  onChange?: ({
    votes,
    unvotes,
  }: {
    votes: string[];
    unvotes: string[];
  }) => void;
}

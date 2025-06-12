import { ValidatorItem } from "src/app/lib/Validators";

export interface ValidatorsListProperties {
  validators: ValidatorItem[];
  currentVote?: string;
  onChange?: ({
    votes,
    unvotes,
  }: {
    votes: string[];
    unvotes: string[];
  }) => void;
}

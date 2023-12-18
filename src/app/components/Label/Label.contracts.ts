import { HTMLAttributes } from "react";

export type LabelVariant = "info" | "success" | "warning";

export interface LabelProperties extends HTMLAttributes<HTMLDivElement> {
  variant?: LabelVariant;
}

import { HTMLAttributes } from "react";

export type LabelVariant = "info" | "success" | "warning" | "danger";
export type SizeVariant = "sm";

export interface LabelProperties extends HTMLAttributes<HTMLDivElement> {
  variant?: LabelVariant;
  size?: SizeVariant;
}

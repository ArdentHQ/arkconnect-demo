import React, { ReactElement } from "react";

export type InputGroupVariant = "default" | "error";

export interface InputGroupProperties extends Omit<
  React.HTMLProps<HTMLDivElement>,
  "label"
> {
  variant?: InputGroupVariant;
  label?: string | ReactElement | ReactElement[];
  help?: string | ReactElement | ReactElement[];
  inputName?: string;
}

export interface InputGroupContextType {
  groupInputName?: string;
  groupVariant?: InputGroupVariant;
}

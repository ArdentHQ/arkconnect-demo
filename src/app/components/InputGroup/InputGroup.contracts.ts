import React from "react";

export type InputGroupVariant = "default" | "error";

export interface InputGroupProperties
  extends Omit<React.HTMLProps<HTMLDivElement>, "label"> {
  variant?: InputGroupVariant;
  label?: string | JSX.Element | JSX.Element[];
  help?: string | JSX.Element | JSX.Element[];
  inputName?: string;
}

export interface InputGroupContextType {
  groupInputName?: string;
  groupVariant?: InputGroupVariant;
}

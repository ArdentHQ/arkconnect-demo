import React, { useRef, forwardRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { useInputIconContext } from "@/app/components/InputIcon";
import {
  useInputGroupContext,
  InputGroupVariant,
} from "@/app/components/InputGroup";

export interface InputProperties extends React.HTMLProps<HTMLInputElement> {
  isFocused?: boolean;
  variant?: InputGroupVariant;
}

export const inputEnabledColorClasses = {
  default:
    "enabled:bg-white enabled:ring-theme-gray-400 enabled:active:ring-black enabled:focus:ring-black dark:enabled:bg-subtle-black dark:enabled:ring-theme-gray-500",
  error:
    "enabled:bg-white enabled:ring-theme-error-200 enabled:active:ring-theme-error-500 enabled:focus:ring-theme-error-500 dark:enabled:bg-subtle-black dark:enabled:ring-theme-error-500",
};

export const inputStyleClasses = [
  "placeholder-theme-gray-400 rounded-lg ring-1 ring-inset text-black dark:placeholder-theme-gray-400 dark:text-white",
  "disabled:ring-theme-gray-200 disabled:bg-theme-gray-100 dark:disabled:bg-base-black dark:disabled:text-theme-gray-400 dark:disabled:ring-theme-gray-600",
  "focus:outline-none",
];

export const Input = forwardRef<HTMLInputElement, InputProperties>(
  (
    {
      id,
      className,
      name,
      variant,
      isFocused = false,
      ...properties
    }: InputProperties,
    reference,
  ) => {
    const { groupInputName, groupVariant } = useInputGroupContext();
    const { iconPosition } = useInputIconContext();

    const inputVariant = variant ?? groupVariant ?? "default";

    const inputId = id ?? groupInputName;

    const inputName = name ?? groupInputName;

    const focusReference = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (isFocused && focusReference.current) {
        focusReference.current.focus();
      }
    }, [focusReference, isFocused]);

    return (
      <input
        id={inputId}
        name={inputName}
        className={twMerge(
          inputEnabledColorClasses[inputVariant],
          "py-3",
          inputStyleClasses,
          iconPosition === undefined ? "px-4" : "",
          iconPosition === "right" ? "pl-4 pr-10" : "",
          iconPosition === "left" ? "pr-4 pl-10" : "",
          className,
        )}
        ref={isFocused ? focusReference : reference}
        {...properties}
      />
    );
  },
);

Input.displayName = "Input";

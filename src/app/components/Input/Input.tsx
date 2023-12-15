import classNames from "classnames";
import React, { useRef, forwardRef, useEffect } from "react";
import { useInputGroupContext } from "@/app/components/InputGroup/InputGroupContext";

type InputVariant = "default" | "error";

interface InputProperties extends React.HTMLProps<HTMLInputElement> {
  isFocused?: boolean;
  variant?: InputVariant;
}

const enabledColors = {
  default:
    "enabled:bg-white enabled:ring-theme-gray-400 enabled:active:ring-black enabled:focus:ring-black",
  error:
    "enabled:bg-white enabled:ring-theme-error-200 enabled:active:ring-theme-error-500 enabled:focus:ring-theme-error-500",
};

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
        className={classNames(
          "placeholder-theme-gray-400 px-4 py-3 rounded-lg ring-1 ring-inset text-black",
          enabledColors[inputVariant],
          "disabled:ring-theme-gray-200",
          "focus:outline-none",
          className,
        )}
        ref={isFocused ? focusReference : reference}
        {...properties}
      />
    );
  },
);

Input.displayName = "Input";

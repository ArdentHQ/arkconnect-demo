import classNames from "classnames";
import React, { useRef, forwardRef, useEffect } from "react";

type InputVariant = "default" | "danger";

interface InputProperties extends React.HTMLProps<HTMLInputElement> {
  isFocused?: boolean;
  variant?: InputVariant;
}

export const Input = forwardRef<HTMLInputElement, InputProperties>(
  (
    { isFocused = false, variant = "default", ...properties }: InputProperties,
    reference,
  ) => {
    const focusReference = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (isFocused && focusReference.current) {
        focusReference.current.focus();
      }
    }, [focusReference, isFocused]);

    return (
      <input
        className={classNames(
          "placeholder-theme-gray-400 px-4 py-3 rounded-lg ring-1 ring-inset text-black",
          "enabled:bg-white enabled:ring-theme-gray-400 enabled:active:ring-black enabled:focus:ring-black",
          "disabled:ring-theme-gray-200",
          "focus:outline-none",
          {
            "": true,
          },
        )}
        ref={isFocused ? focusReference : reference}
        {...properties}
      />
    );
  },
);

Input.displayName = "Input";

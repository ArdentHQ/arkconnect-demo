import React, { useRef, forwardRef, useEffect } from "react";

interface InputProperties extends React.HTMLProps<HTMLInputElement> {
  isFocused?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProperties>(
  ({ isFocused, ...properties }: InputProperties, reference) => {
    const focusReference = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (isFocused && focusReference.current) {
        focusReference.current.focus();
      }
    }, [focusReference, isFocused]);

    return (
      <input ref={isFocused ? focusReference : reference} {...properties} />
    );
  },
);

Input.displayName = "Input";

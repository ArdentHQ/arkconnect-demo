import classNames from "classnames";
import React, { useRef, forwardRef, useEffect } from "react";
import {
  useInputGroupContext,
  InputGroupVariant,
} from "@/app/components/InputGroup";
import {
  inputEnabledColorClasses,
  inputStyleClasses,
} from "@/app/components/Input";

interface TextareaProperties extends React.HTMLProps<HTMLTextAreaElement> {
  isFocused?: boolean;
  variant?: InputGroupVariant;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProperties>(
  (
    {
      id,
      className,
      name,
      variant,
      isFocused = false,
      ...properties
    }: TextareaProperties,
    reference,
  ) => {
    const { groupInputName, groupVariant } = useInputGroupContext();

    const inputVariant = variant ?? groupVariant ?? "default";

    const textareaId = id ?? groupInputName;

    const textareaName = name ?? groupInputName;

    const focusReference = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      if (isFocused && focusReference.current) {
        focusReference.current.focus();
      }
    }, [focusReference, isFocused]);

    return (
      <textarea
        id={textareaId}
        name={textareaName}
        className={classNames(
          inputEnabledColorClasses[inputVariant],
          inputStyleClasses,
          "py-3 px-4",
          className,
        )}
        ref={isFocused ? focusReference : reference}
        {...properties}
      />
    );
  },
);

Textarea.displayName = "Textarea";

import cn from "classnames";
import React from "react";

export type InputGroupVariant = "default" | "error";

interface InputGroupProperties
  extends Omit<React.HTMLProps<HTMLDivElement>, "label"> {
  variant?: InputGroupVariant;
  label?: string | JSX.Element | JSX.Element[];
  help?: string | JSX.Element | JSX.Element[];
  inputName?: string;
}

export const InputGroup = ({
  children,
  label,
  help,
  inputName,
  variant = "default",
  ...properties
}: InputGroupProperties): JSX.Element => {
  return (
    <div className="flex flex-col space-y-1.5" {...properties}>
      {label && (
        <label
          htmlFor={inputName}
          className="text-sm font-medium text-theme-gray-500"
        >
          {label}
        </label>
      )}

      {children}

      {help && (
        <span
          className={cn("text-sm", {
            "text-theme-gray-500": variant === "default",
            "text-theme-error-500": variant === "error",
          })}
        >
          {help}
        </span>
      )}
    </div>
  );
};

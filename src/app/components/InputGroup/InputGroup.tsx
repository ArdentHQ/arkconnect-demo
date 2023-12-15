import React from "react";
import cn from "classnames";
import { InputGroupProperties } from "./InputGroup.contracts";
import { InputGroupContext } from "./InputGroupContext";

export const InputGroup = ({
  children,
  label,
  help,
  inputName,
  variant = "default",
  ...properties
}: InputGroupProperties): JSX.Element => {
  return (
    <InputGroupContext.Provider
      value={{ groupInputName: inputName, groupVariant: variant }}
    >
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
    </InputGroupContext.Provider>
  );
};

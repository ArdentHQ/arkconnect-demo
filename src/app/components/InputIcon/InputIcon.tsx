import React from "react";
import cn from "classnames";
import { InputIconProperties } from "./InputIcon.contracts";
import { InputIconContext } from "./InputIconContext";

export const InputIcon = ({
  children,
  className,
  icon: Icon,
  iconClassName,
  position = "left",
  ...properties
}: InputIconProperties): JSX.Element => {
  return (
    <InputIconContext.Provider value={{ iconPosition: position }}>
      <div
        className={cn("relative inline-flex items-center", className, {
          "flex-row-reverse": position === "right",
        })}
        {...properties}
      >
        <Icon
          className={cn(
            "text-gray-500 w-4 h-4 absolute pointer-events-none",
            iconClassName,
            {
              "ml-3.5": position === "left",
              "mr-3.5": position === "right",
            },
          )}
        />

        {children}
      </div>
    </InputIconContext.Provider>
  );
};

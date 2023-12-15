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
        className={cn("relative inline-flex items-center", className)}
        {...properties}
      >
        <Icon
          className={cn(
            "text-gray-500 w-4 h-4 absolute pointer-events-none ml-3.5",
            iconClassName,
          )}
        />

        {children}
      </div>
    </InputIconContext.Provider>
  );
};

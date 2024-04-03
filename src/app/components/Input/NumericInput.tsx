import React from "react";
import cn from "classnames";
import {
  NumericFormat,
  NumericFormatProps,
  OnValueChange,
} from "react-number-format";
import BigNumber from "bignumber.js";
import { inputEnabledColorClasses, inputStyleClasses } from "./Input";
import {
  InputGroupVariant,
  useInputGroupContext,
} from "@/app/components/InputGroup";
import ArrowUp from "@/public/icons/arrow-up.svg";

interface NumericInputProperties extends NumericFormatProps {
  visible?: boolean;
  value?: string;
  onValueChange: OnValueChange;
  setValue: (value?: string) => void;
  step?: number;
  variant?: InputGroupVariant;
}

export const NumericInput = ({
  visible = true,
  value,
  setValue,
  onValueChange,
  step = 0.000_000_01,
  variant,
  ...properties
}: NumericInputProperties) => {
  const { groupVariant } = useInputGroupContext();
  const inputVariant = variant ?? groupVariant ?? "default";

  return (
    <>
      <div
        className={cn("relative w-full h-[52px]", {
          hidden: !visible,
          flex: visible,
        })}
      >
        <NumericFormat
          decimalScale={8}
          displayType="input"
          className={cn(
            "border-theme-gray-400 rounded-l-lg px-3 text-md leading-5 block w-full py-2.5 focus:ring-1 ring-theme-gray-400 rounded-e-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            inputEnabledColorClasses[inputVariant],
            inputStyleClasses,
          )}
          value={value}
          onValueChange={onValueChange}
          {...properties}
        />
        <div className="flex flex-col border border-l-0 dark:border-theme-gray-500 overflow-hidden rounded-e-lg border-theme-gray-400 w-10 shrink-0">
          <button
            type="button"
            onClick={() => {
              const nextValue = new BigNumber(value || 0).plus(step);
              const formatted = Number(nextValue.toString()).toFixed(8);

              setValue(new BigNumber(formatted).toFixed());
            }}
            className="flex items-center justify-center hover:bg-theme-gray-50 dark:hover:bg-theme-gray-600 basis-1/2 w-full focus:ring-gray-100 focus:ring-2 focus:outline-none relative after:content-[''] after:absolute after:border-t after:bottom-0 after:border-theme-gray-400 after:w-full"
          >
            <ArrowUp className="w-2.5 h-2.5 dark:text-white" />
          </button>
          <button
            type="button"
            onClick={() => {
              const nextValue = new BigNumber(value || 0).minus(step);

              if (!nextValue.isLessThanOrEqualTo(0)) {
                const formatted = Number(
                  nextValue.decimalPlaces(8).toFixed(8),
                ).toFixed(8);

                setValue(new BigNumber(formatted).toFixed());
              }
            }}
            className="flex items-center relative hover:bg-theme-gray-50 dark:hover:bg-theme-gray-600 justify-center basis-1/2 text-center w-full focus:ring-gray-100 focus:ring-2 focus:outline-none"
          >
            <ArrowUp className="w-2.5 h-2.5 rotate-180 dark:text-white" />
          </button>
        </div>
      </div>
    </>
  );
};

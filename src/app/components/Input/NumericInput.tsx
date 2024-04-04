import React, { useRef } from "react";
import cn from "classnames";
import BigNumber from "bignumber.js";
import { UseFormRegisterReturn } from "react-hook-form";
import { Input } from "./Input";
import { InputGroupVariant } from "@/app/components/InputGroup";
import ArrowUp from "@/public/icons/arrow-up.svg";

interface InputProperties extends React.InputHTMLAttributes<HTMLInputElement> {
  visible?: boolean;
  step?: number;
  inputFormProperties?: UseFormRegisterReturn;
  onValueChange: (value: string) => void;
  variant?: InputGroupVariant;
}

export const NumericInput = ({
  visible = true,
  step = 0.01,
  inputFormProperties,
  onValueChange,
  variant,
  ...properties
}: InputProperties) => {
  const { ref } = inputFormProperties ?? {};
  const inputReference = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <div
        className={cn("relative w-full h-[52px]", {
          hidden: !visible,
          flex: visible,
        })}
      >
        <Input
          type="text"
          step={step}
          {...inputFormProperties}
          ref={(element) => {
            ref?.(element);
            inputReference.current = element;
          }}
          className="border-theme-gray-400 rounded-l-lg px-3 text-md leading-5 block w-full py-2.5 focus:ring-1 ring-theme-gray-400 rounded-e-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          variant={variant}
          {...properties}
        />
        <div className="flex flex-col border border-l-0 dark:border-theme-gray-500 overflow-hidden rounded-e-lg border-theme-gray-400 w-10 shrink-0">
          <button
            type="button"
            onClick={() => {
              const nextValue = new BigNumber(
                inputReference.current?.value || 0,
              ).plus(step);

              const formatted = Number(nextValue.toString()).toFixed(8);

              onValueChange(new BigNumber(formatted).toFixed());
            }}
            className="flex items-center justify-center hover:bg-theme-gray-50 dark:hover:bg-theme-gray-600 basis-1/2 w-full focus:ring-gray-100 focus:ring-2 focus:outline-none relative after:content-[''] after:absolute after:border-t after:bottom-0 after:border-theme-gray-400 after:w-full"
          >
            <ArrowUp className="w-2.5 h-2.5 dark:text-white" />
          </button>
          <button
            type="button"
            onClick={() => {
              const nextValue = new BigNumber(
                inputReference.current?.value || 0,
              ).minus(step);

              if (!nextValue.isLessThanOrEqualTo(0)) {
                const formatted = Number(
                  nextValue.decimalPlaces(8).toFixed(8),
                ).toFixed(8);

                onValueChange(new BigNumber(formatted).toFixed());
              }
            }}
            className="flex items-center relative hover:bg-theme-gray-50 dark:hover:bg-theme-gray-600 justify-center basis-1/2 text-center  w-full focus:ring-gray-100 focus:ring-2 focus:outline-none"
          >
            <ArrowUp className="w-2.5 h-2.5 rotate-180 dark:text-white" />
          </button>
        </div>
      </div>
    </>
  );
};

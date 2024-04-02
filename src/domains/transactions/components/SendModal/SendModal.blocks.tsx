import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { useTranslation } from "next-i18next";
import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import BigNumber from "bignumber.js";
import { NetworkType } from "@/app/lib/Network";
import { Input } from "@/app/components/Input";
import ArrowUp from "@/public/icons/arrow-up.svg";
import { useNetworkFees } from "@/app/hooks/useNetworkFees";
import { getNetworkCoin } from "@/app/utils/network";

export const FeeInput = ({
  feeInputProperties,
  onFeeChange,
  error,
  network,
}: {
  feeInputProperties: UseFormRegisterReturn;
  onFeeChange: (fee: string) => void;
  error: FieldError | undefined;
  network: NetworkType;
}) => {
  const { t } = useTranslation("transactions");

  const [advancedView, showAdvancedView] = useState(false);

  return (
    <div className="inline-flex flex-col space-y-1.5">
      <div className="flex justify-between">
        <label
          htmlFor="advancedFee"
          className="text-sm font-medium text-theme-gray-500 dark:text-theme-gray-200"
        >
          <span className="hidden sm:block">{t("TRANSACTION_FEE")}</span>
          <span className="block sm:hidden">{t("FEE")}</span>
        </label>

        <label className="inline-flex items-center cursor-pointer space-x-2">
          <input
            type="checkbox"
            checked={advancedView}
            className="sr-only peer"
            onChange={() => showAdvancedView(!advancedView)}
          />
          <span
            className={cn("ms-3 text-sm font-medium", {
              "text-theme-gray-00 dark:text-theme-gray-200": !advancedView,
              "text-theme-gray-400 dark:text-theme-gray-400": advancedView,
            })}
          >
            {t("SIMPLE")}
          </span>
          <div className="relative w-9 h-5 bg-theme-primary-700 peer-focus-visible:outline-none peer-focus-visible:ring-4 peer-focus-visible:ring-theme-gray-300 rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-theme-primary-700 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
          <span
            className={cn("ms-3 text-sm font-medium", {
              "text-theme-gray-500 dark:text-theme-gray-200": advancedView,
              "text-theme-gray-400 dark:text-theme-gray-400": !advancedView,
            })}
          >
            {t("ADVANCED")}
          </span>
        </label>
      </div>

      <div className="mt-1.5">
        {!advancedView && (
          <SimpleFeeView onSelect={onFeeChange} network={network} />
        )}
        <AdvancedFeeView
          feeInputProperties={feeInputProperties}
          visible={advancedView}
          onFeeChange={onFeeChange}
        />
        {error?.message && (
          <span className="text-sm text-theme-error-500">{error.message}</span>
        )}
      </div>
    </div>
  );
};

const AdvancedFeeView = ({
  feeInputProperties,
  visible,
  onFeeChange,
}: {
  feeInputProperties: UseFormRegisterReturn;
  visible: boolean;
  onFeeChange: (value: string) => void;
}) => {
  const { ref } = feeInputProperties;
  const feeInputReference = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <div
        className={cn("relative w-full h-[52px]", {
          hidden: !visible,
          flex: visible,
        })}
      >
        <Input
          id="advancedFee"
          placeholder="0.00"
          step="0.00000001"
          type="number"
          {...feeInputProperties}
          ref={(element) => {
            ref(element);
            feeInputReference.current = element;
          }}
          className="border-theme-gray-400 rounded-l-lg px-3 text-md leading-5 block w-full py-2.5 focus:ring-1 ring-theme-gray-400 rounded-e-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <div className="flex flex-col border border-l-0 dark:border-theme-gray-500 overflow-hidden rounded-e-lg border-theme-gray-400 w-10 shrink-0">
          <button
            type="button"
            onClick={() => {
              const nextValue = new BigNumber(
                feeInputReference.current?.value ?? 0,
              ).plus(0.01);

              const formatted = Number(nextValue.toString()).toFixed(8);

              onFeeChange(new BigNumber(formatted).toFixed());
            }}
            className="flex items-center justify-center hover:bg-theme-gray-50 dark:hover:bg-theme-gray-600 basis-1/2 w-full focus:ring-gray-100 focus:ring-2 focus:outline-none relative after:content-[''] after:absolute after:border-t after:bottom-0 after:border-theme-gray-400 after:w-full"
          >
            <ArrowUp className="w-2.5 h-2.5 dark:text-white" />
          </button>
          <button
            type="button"
            onClick={() => {
              const nextValue = new BigNumber(
                feeInputReference.current?.value ?? 0,
              ).minus(0.01);

              if (!nextValue.isLessThanOrEqualTo(0)) {
                const formatted = Number(
                  nextValue.decimalPlaces(8).toFixed(8),
                ).toFixed(8);

                onFeeChange(new BigNumber(formatted).toFixed());
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

const SimpleFeeView = ({
  onSelect,
  network,
}: {
  onSelect: (v: string) => void;
  network: NetworkType;
}) => {
  const { t } = useTranslation("transactions");

  const [selected, setSelected] = useState("average");

  const onFeeSelect = (fee: string, type: string) => {
    onSelect(fee);
    setSelected(type);
  };

  const { fees, status } = useNetworkFees(network);

  useEffect(() => {
    if (status === "ok" && fees.avg) {
      onFeeSelect(fees.avg.crypto, "average");
    }
  }, [status]);

  return (
    <div className="flex flex-col sm:flex-row justify-space-between space-y-1.5 sm:space-y-0 sm:space-x-1.5 flex-1">
      <FeeOption
        title={t("SLOW")}
        cryptoAmount={fees.min?.crypto ?? "0"}
        fiatAmount={fees.min?.fiat ?? "0"}
        isSelected={selected === "slow"}
        network={network}
        onSelect={() => onFeeSelect(fees.min?.crypto ?? "0", "slow")}
      />
      <FeeOption
        title={t("AVERAGE")}
        cryptoAmount={fees.avg?.crypto ?? "0"}
        fiatAmount={fees.avg?.fiat ?? "0"}
        isSelected={selected === "average"}
        network={network}
        onSelect={() => onFeeSelect(fees.avg?.crypto ?? "0", "average")}
      />
      <FeeOption
        title={t("FAST")}
        cryptoAmount={fees.max?.crypto ?? "0"}
        fiatAmount={fees.max?.fiat ?? "0"}
        isSelected={selected === "fast"}
        network={network}
        onSelect={() => onFeeSelect(fees.max?.crypto ?? "0", "fast")}
      />
    </div>
  );
};

const FeeOption = ({
  title,
  cryptoAmount,
  fiatAmount,
  isSelected,
  onSelect,
  network,
}: {
  title: string;
  cryptoAmount: string;
  fiatAmount: string;
  isSelected?: boolean;
  onSelect: (v: string) => void;
  network: NetworkType;
}) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(cryptoAmount)}
      className={cn(
        "flex flex-row sm:flex-col flex-1 space-x-1 sm:space-x-0 items-center border p-3 rounded-md",
        {
          "border-theme-primary-700 bg-theme-primary-50 dark:bg-[#02a86326] dark:border-theme-primary-650":
            isSelected,
          "border-theme-gray-400 dark:border-theme-gray-500 hover:border-black hover:bg-theme-gray-50 dark:hover:bg-theme-gray-700 dark:hover:border-white":
            !isSelected,
        },
      )}
    >
      <span className="flex flex-row sm:flex-col justify-between flex-1 items-center sm:pb-2 text-theme-gray-500 dark:text-theme-gray-200">
        <span
          className={cn("font-medium sm:pb-1 leading-5", {
            "text-black dark:text-theme-gray-200": isSelected,
          })}
        >
          {" "}
          {title}{" "}
        </span>
        <span className="leading-4.5">
          {" "}
          {cryptoAmount} {getNetworkCoin(network)}
        </span>
      </span>
      {network === NetworkType.MAINNET && (
        <span className="font-medium leading-4.5 text-theme-gray-400 dark:text-theme-gray-400">
          ${fiatAmount}{" "}
        </span>
      )}
    </button>
  );
};

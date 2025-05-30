import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import cn from "classnames";
import { twMerge } from "tailwind-merge";
import { NetworkType, TransactionType } from "@/app/lib/Network";
import { NumericInput } from "@/app/components/Input";
import { useNetworkFees } from "@/app/hooks/useNetworkFees";
import { getNetworkCoin } from "@/app/utils/network";
import { Skeleton } from "@/app/components/Skeleton";
import { BigNumber } from "bignumber.js";
import { InputGroup } from "@/app/components/InputGroup";

export const FeeInput = ({
  gasPriceInputProperties,
  gasLimitInputProperties,
  onGasPriceChange,
  onGasLimitChange,
  errors,
  network,
  className,
  type,
}: {
  gasPriceInputProperties: UseFormRegisterReturn | undefined;
  gasLimitInputProperties: UseFormRegisterReturn | undefined;
  onGasPriceChange: (gasPrice: BigNumber) => void;
  onGasLimitChange: (gasLimit: BigNumber) => void;
  errors: FieldErrors;
  network: NetworkType;
  className?: string;
  type: TransactionType;
}) => {
  const { t } = useTranslation("transactions");

  const [advancedView, showAdvancedView] = useState(false);

  return (
    <div className={twMerge("inline-flex flex-col space-y-1.5", className)}>
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
              "text-theme-gray-500 dark:text-theme-gray-200": !advancedView,
              "text-theme-gray-400 dark:text-theme-gray-400": advancedView,
            })}
          >
            {t("SIMPLE")}
          </span>
          <div className="relative w-9 h-5 bg-theme-primary-600 peer-focus-visible:outline-none peer-focus-visible:ring-2 ring-offset-1 peer-focus-visible:ring-theme-gray-300 rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-theme-primary-600 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
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
          <SimpleFeeView
            onSelect={(gasPrice: BigNumber, gasLimit: BigNumber) => {
              onGasLimitChange(gasLimit);
              onGasPriceChange(gasPrice);
            }}
            network={network}
            type={type}
          />
        )}

        {advancedView && (
          <AdvancedFeeView
            gasPriceInputProperties={gasPriceInputProperties}
            gasLimitInputProperties={gasLimitInputProperties}
            onGasPriceChange={onGasPriceChange}
            onGasLimitChange={onGasLimitChange}
            errors={errors}
          />
        )}
      </div>
    </div>
  );
};

const AdvancedFeeView = ({
  gasPriceInputProperties,
  gasLimitInputProperties,
  onGasPriceChange,
  onGasLimitChange,
  errors,
}: {
  gasPriceInputProperties: UseFormRegisterReturn | undefined;
  gasLimitInputProperties: UseFormRegisterReturn | undefined;
  onGasPriceChange: (gasPrice: BigNumber) => void;
  onGasLimitChange: (gasLimit: BigNumber) => void;
  errors: FieldErrors;
}) => {
  const { t } = useTranslation("transactions");

  return (
    <div className="border-theme-gray-400 dark:border-theme-gray-500 -mx-4 overflow-hidden rounded-xl border">
      <div className="space-y-4 p-4">
        <InputGroup
          label={t("GAS_PRICE_GWEI")}
          className="w-full"
          variant={errors?.gasPrice?.message ? "error" : undefined}
          help={errors?.gasPrice?.message}
        >
          <NumericInput
            id="gasPrice"
            placeholder="0.00"
            step={1}
            inputFormProperties={gasPriceInputProperties}
            onValueChange={(value: string) => {
              onGasPriceChange(BigNumber(value));
            }}
            variant={errors?.gasPrice?.message ? "error" : "default"}
          />
        </InputGroup>
        <InputGroup
          label={t("GAS_LIMIT")}
          className="w-full"
          variant={errors?.gasLimit?.message ? "error" : undefined}
          help={errors?.gasLimit?.message}
        >
          <NumericInput
            id="gasLimit"
            placeholder="0.00"
            step={1000}
            inputFormProperties={gasLimitInputProperties}
            onValueChange={(value: string) => {
              onGasLimitChange(BigNumber(value));
            }}
            variant={errors?.gasLimit?.message ? "error" : "default"}
          />
        </InputGroup>
      </div>
    </div>
  );
};

const SimpleFeeView = ({
  onSelect,
  network,
  type,
}: {
  onSelect: (gasPrice: BigNumber, gasLimit: BigNumber) => void;
  network: NetworkType;
  type: TransactionType;
}) => {
  const { t } = useTranslation("transactions");

  const [selected, setSelected] = useState("average");

  const onFeeSelect = (
    gasPrice: BigNumber,
    gasLimit: BigNumber,
    type: string,
  ) => {
    onSelect(gasPrice, gasLimit);
    setSelected(type);
  };

  const { fees, status } = useNetworkFees(network, type);

  useEffect(() => {
    if (status === "ok" && fees?.avg) {
      onFeeSelect(fees.avg.gasPrice, fees.avg.gasLimit, "average");
    }
  }, [status]);

  if (!fees || status === "loading") {
    const isMainNet = network === NetworkType.MAINNET;
    return (
      <div className="flex flex-col sm:flex-row justify-space-between space-y-1.5 sm:space-y-0 sm:space-x-1.5 flex-1">
        <FeeOptionSkeleton withFiat={isMainNet} />
        <FeeOptionSkeleton withFiat={isMainNet} />
        <FeeOptionSkeleton withFiat={isMainNet} />
      </div>
    );
  }

  const formatFee = (fee: BigNumber) => fee.decimalPlaces(7).toString();

  return (
    <div className="flex flex-col sm:flex-row justify-space-between space-y-1.5 sm:space-y-0 sm:space-x-1.5 flex-1">
      <FeeOption
        title={t("SLOW")}
        cryptoAmount={formatFee(fees.min.fee)}
        fiatAmount={fees.min.fiat}
        isSelected={selected === "slow"}
        network={network}
        onSelect={() =>
          onFeeSelect(fees?.min.gasPrice, fees?.min.gasLimit, "slow")
        }
      />
      <FeeOption
        title={t("AVERAGE")}
        cryptoAmount={formatFee(fees.avg.fee)}
        fiatAmount={fees.avg.fiat}
        isSelected={selected === "average"}
        network={network}
        onSelect={() =>
          onFeeSelect(fees?.avg.gasPrice, fees?.avg.gasLimit, "average")
        }
      />
      <FeeOption
        title={t("FAST")}
        cryptoAmount={formatFee(fees.max.fee)}
        fiatAmount={fees.max.fiat}
        isSelected={selected === "fast"}
        network={network}
        onSelect={() =>
          onFeeSelect(fees?.max.gasPrice, fees?.max.gasLimit, "fast")
        }
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
          "border-theme-primary-600 bg-theme-primary-50 dark:bg-theme-dark-primary-900 dark:border-theme-dark-primary-600":
            isSelected,
          "border-theme-gray-400 dark:border-theme-gray-500 dark:bg-subtle-black hover:border-black hover:bg-theme-gray-   dark:hover:bg-theme-gray-700 dark:hover:border-white":
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

const FeeOptionSkeleton = ({ withFiat = true }) => {
  return (
    <div
      className={cn(
        "flex flex-1 sm:justify-center items-center flex-row sm:flex-col border p-3 rounded-md space-x-1 sm:space-x-0 sm:space-y-1 border-theme-gray-400",
        { "h-[93px]": withFiat },
        { "h-[75.5px]": !withFiat },
      )}
    >
      <div className="flex justify-between sm:flex-col items-center flex-1">
        <Skeleton className="w-16 h-5 sm:mb-1 self-center" />
        <Skeleton className="w-20 h-4.5 self-center" />
      </div>
      {withFiat && <Skeleton className="w-16 h-4.5 self-center" />}
    </div>
  );
};

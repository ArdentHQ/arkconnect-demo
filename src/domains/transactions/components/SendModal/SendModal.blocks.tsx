import {
  FieldErrors,
  UseFormRegister,
  UseFormRegisterReturn,
  UseFormSetValue,
} from "react-hook-form";
import { useTranslation } from "next-i18next";
import React, { ChangeEvent, useEffect, useState } from "react";
import cn from "classnames";
import { twMerge } from "tailwind-merge";
import { BigNumber } from "bignumber.js";
import { NetworkType, TransactionType } from "@/app/lib/Network";
import { NumericInput } from "@/app/components/Input";
import { calculateFee, useNetworkFees } from "@/app/hooks/useNetworkFees";
import { getNetworkCoin } from "@/app/utils/network";
import { Skeleton } from "@/app/components/Skeleton";
import { InputGroup } from "@/app/components/InputGroup";
import { WalletData } from "@/app/lib/Wallet/contracts";

interface FormValues {
  gasPrice: BigNumber;
  gasLimit: BigNumber;
  amount?: string;
}

export const formatFee = (fee: BigNumber) => fee.decimalPlaces(7).toString();

export const FeeInput = ({
  register,
  setValue,
  gasPrice,
  gasLimit,
  errors,
  wallet,
  className,
  type,
}: {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  gasPrice: BigNumber;
  gasLimit: BigNumber;
  errors: FieldErrors;
  wallet: WalletData;
  className?: string;
  type: TransactionType;
}) => {
  const { t } = useTranslation("transactions");

  const [advancedView, showAdvancedView] = useState(false);

  const network = wallet.network;

  const [gasPriceInputProperties, setGasPriceInputProperties] = useState<
    UseFormRegisterReturn | undefined
  >(undefined);
  const [gasLimitInputProperties, setGasLimitInputProperties] = useState<
    UseFormRegisterReturn | undefined
  >(undefined);

  const onGasPriceChange = (value: BigNumber) => {
    setValue("gasPrice", value, {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    });
  };

  const onGasLimitChange = (value: BigNumber) => {
    setValue("gasLimit", value, {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    const inputGasPriceProperties = register("gasPrice", {
      required: t("GAS_PRICE_IS_REQUIRED"),
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === "" ? 0 : event.target.value;
        onGasPriceChange(BigNumber(value));
      },
      min: {
        value: 5,
        message: t("GAS_PRICE_TOO_LOW"),
      },
      max: {
        value: 10_000,
        message: t("GAS_PRICE_TOO_HIGH"),
      },
      valueAsNumber: false,
      validate: (value, formValues: FormValues) => {
        if (formValues.amount !== "") {
          return true;
        }

        return validateBalance(
          formValues,
          t("FEE_EXCEEDS_BALANCE"),
          wallet.balance,
        );
      },
      deps: ["amount", "gasLimit"],
    });

    const inputGasLimitProperties = register("gasLimit", {
      required: t("GAS_LIMIT_IS_REQUIRED"),
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === "" ? 0 : event.target.value;
        onGasLimitChange(BigNumber(value));
      },
      min: {
        value: 21_000,
        message: t("GAS_LIMIT_TOO_LOW"),
      },
      max: {
        value: 2_000_000,
        message: t("GAS_LIMIT_TOO_HIGH"),
      },
      valueAsNumber: false,
      validate: (value, formValues: FormValues) => {
        if (formValues.amount !== "") {
          return true;
        }

        return validateBalance(
          formValues,
          t("FEE_EXCEEDS_BALANCE"),
          wallet.balance,
        );
      },
      deps: ["amount", "gasPrice"],
    });

    setGasLimitInputProperties(inputGasLimitProperties);
    setGasPriceInputProperties(inputGasPriceProperties);
  }, [register, wallet]);

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
            gasPrice={gasPrice}
            gasLimit={gasLimit}
            errors={errors}
          />
        )}
      </div>
    </div>
  );
};

export const validateBalance = (
  formValues: FormValues,
  message: string,
  balance?: number,
) => {
  const { amount: amountString, gasPrice, gasLimit } = formValues;

  const amount = BigNumber(amountString ?? 0);

  const fee = calculateFee(gasPrice, gasLimit);

  if (BigNumber.sum(amount, fee).isGreaterThan(BigNumber(balance ?? 0))) {
    return message;
  }
};

const AdvancedFeeView = ({
  gasPriceInputProperties,
  gasLimitInputProperties,
  onGasPriceChange,
  onGasLimitChange,
  gasPrice,
  gasLimit,
  errors,
}: {
  gasPriceInputProperties: UseFormRegisterReturn | undefined;
  gasLimitInputProperties: UseFormRegisterReturn | undefined;
  onGasPriceChange: (gasPrice: BigNumber) => void;
  onGasLimitChange: (gasLimit: BigNumber) => void;
  gasPrice: BigNumber;
  gasLimit: BigNumber;
  errors: FieldErrors;
}) => {
  const { t } = useTranslation("transactions");

  const fee = calculateFee(gasPrice, gasLimit);

  const confirmationTime = "~10s";

  return (
    <div className="border-theme-gray-400 dark:border-theme-gray-500 -mx-4 overflow-hidden rounded-xl border">
      <div className="space-y-4 p-4">
        <InputGroup
          label={t("GAS_PRICE_GWEI")}
          className="w-full"
          variant={errors.gasPrice?.message ? "error" : undefined}
          help={
            typeof errors.gasPrice?.message === "string"
              ? errors.gasPrice.message
              : undefined
          }
        >
          <NumericInput
            id="gasPrice"
            placeholder="0.00"
            step={1}
            inputFormProperties={gasPriceInputProperties}
            onValueChange={(value: string) => {
              onGasPriceChange(BigNumber(value));
            }}
            variant={errors.gasPrice?.message ? "error" : "default"}
          />
        </InputGroup>
        <InputGroup
          label={t("GAS_LIMIT")}
          className="w-full"
          variant={errors.gasLimit?.message ? "error" : undefined}
          help={
            typeof errors.gasLimit?.message === "string"
              ? errors.gasLimit.message
              : undefined
          }
        >
          <NumericInput
            id="gasLimit"
            placeholder="0.00"
            step={1000}
            inputFormProperties={gasLimitInputProperties}
            onValueChange={(value: string) => {
              onGasLimitChange(BigNumber(value));
            }}
            variant={errors.gasLimit?.message ? "error" : "default"}
          />
        </InputGroup>
      </div>
      <div className="bg-white sm:shadow-sm dark:bg-subtle-black text-theme-gray-500 dark:text-theme-gray-300 flex flex-col space-y-2 px-4 py-3 text-xs leading-[15px] font-semibold sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:py-2">
        <div className="space-x-1">
          <span>{t("MAX_FEE")}</span>
          <span>{formatFee(fee)} DARK</span>
        </div>
        <div className="space-x-1">
          <span>{t("CONFIRMATION_TIME")}</span>
          <span>{confirmationTime}</span>
        </div>
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

  return (
    <div className="flex flex-col sm:flex-row justify-space-between space-y-1.5 sm:space-y-0 sm:space-x-1.5 flex-1">
      <FeeOption
        title={t("SLOW")}
        cryptoAmount={formatFee(fees.min.fee)}
        fiatAmount={fees.min.fiat}
        isSelected={selected === "slow"}
        network={network}
        onSelect={() =>
          onFeeSelect(fees.min.gasPrice, fees.min.gasLimit, "slow")
        }
      />
      <FeeOption
        title={t("AVERAGE")}
        cryptoAmount={formatFee(fees.avg.fee)}
        fiatAmount={fees.avg.fiat}
        isSelected={selected === "average"}
        network={network}
        onSelect={() =>
          onFeeSelect(fees.avg.gasPrice, fees.avg.gasLimit, "average")
        }
      />
      <FeeOption
        title={t("FAST")}
        cryptoAmount={formatFee(fees.max.fee)}
        fiatAmount={fees.max.fiat}
        isSelected={selected === "fast"}
        network={network}
        onSelect={() =>
          onFeeSelect(fees.max.gasPrice, fees.max.gasLimit, "fast")
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

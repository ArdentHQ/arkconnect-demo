import { useTranslation } from "next-i18next";
import cn from "classnames";
import { WalletOverviewProperties } from "./WalletOverview.contracts";
import { Button } from "@/app/components/Button";
import { useWalletBalance } from "@/app/hooks/useWalletBalance";
import { NetworkType } from "@/app/lib/Network";

export const WalletBalance = ({
  className,
  walletData,
  onSend,
  onVote,
  onSign,
}: WalletOverviewProperties) => {
  const { t } = useTranslation();
  const { balance } = useWalletBalance({ walletData });

  return (
    <div
      className={cn(
        "flex flex-col items-start sm:items-end sm:flex-row justify-between w-full p-6 bg-theme-primary-600 text-white dark:bg-theme-dark-primary-900",
        className,
      )}
    >
      <div className="flex flex-col  items-start">
        <p className="font-medium text-xs leading-[0.938rem] mb-1">
          <span className="text-theme-primary-100">{t("BALANCE")}</span>{" "}
          <span className="text-theme-primary-200 dark:text-theme-primary-100">
            {walletData.network === NetworkType.MAINNET ? balance.usd : t("NA")}
          </span>
        </p>

        <div className="leading-[1.25rem] w-full font-bold font-sans text-xl dark:text-white">
          {balance.ark}
        </div>
      </div>

      <div className="my-2 bg-theme h-px bg-theme-primary-600 w-full sm:hidden" />

      <div className="flex items-center justify-stretch sm:justify-between space-x-3 w-full sm:w-auto">
        <Button
          variant="secondary-bordered"
          onClick={onSign}
          className="w-full sm:w-auto"
        >
          {t("SIGN")}
        </Button>

        <Button
          variant="secondary-bordered"
          onClick={onVote}
          className="w-full sm:w-auto"
        >
          {t("VOTE")}
        </Button>

        <Button
          variant="secondary"
          onClick={onSend}
          className="w-full sm:w-auto"
        >
          {t("Send")}
        </Button>
      </div>
    </div>
  );
};

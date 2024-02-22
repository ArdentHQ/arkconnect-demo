import { useTranslation } from "next-i18next";
import cn from "classnames";
import { WalletOverviewProperties } from "./WalletOverview.contracts";
import { Button } from "@/app/components/Button";
import { useWalletBalance } from "@/app/hooks/useWalletBalance";
import { NetworkType } from "@/app/lib/Network";
import { Spinner } from "@/app/components/Spinner";
import { useArkConnectContext } from "@/app/contexts/useArkConnectContext";

export const WalletBalance = ({
  className,
  walletData,
  onSend,
  onVote,
  onSign,
}: WalletOverviewProperties) => {
  const { t } = useTranslation();
  const { balance } = useWalletBalance({ walletData });

  const { isSigning, isVoting, isTransacting } = useArkConnectContext();

  return (
    <div
      className={cn(
        "flex flex-col items-start sm:items-end sm:flex-row justify-between w-full p-6 bg-theme-primary-700 text-white",
        className,
      )}
    >
      <div className="flex flex-col  items-start">
        <p className="font-medium text-sm leading-[0.938rem] mb-1">
          <span className="text-theme-primary-100">{t("BALANCE")}</span>{" "}
          <span className="text-theme-primary-500">
            {walletData.network !== NetworkType.MAINNET || !balance
              ? t("NA")
              : balance.usd}
          </span>
        </p>

        <div className="leading-[1.25rem] w-full font-bold font-sans text-xl">
          {balance?.ark}
        </div>
      </div>

      <div className="my-2 bg-theme h-px bg-theme-primary-650 w-full sm:hidden" />

      <div className="flex items-center justify-stretch sm:justify-between space-x-3 w-full sm:w-auto">
        <Button
          variant="secondary-bordered"
          disabled={isSigning}
          onClick={onSign}
          className="w-full sm:w-auto"
        >
          <ButtonBody
            isLoading={isSigning}
            loadingText={t("SIGNING")}
            text={t("SIGN")}
          />
        </Button>

        <Button
          variant="secondary-bordered"
          onClick={onVote}
          disabled={isVoting}
          className="w-full sm:w-auto"
        >
          <ButtonBody
            isLoading={isVoting}
            loadingText={t("VOTING")}
            text={t("VOTE")}
          />
        </Button>

        <Button
          variant="secondary"
          onClick={onSend}
          className="w-full sm:w-auto"
        >
          <ButtonBody
            isLoading={isTransacting}
            loadingText={t("SENDING")}
            text={t("SEND")}
          />
        </Button>
      </div>
    </div>
  );
};

const ButtonBody = ({
  isLoading,
  loadingText,
  text,
}: {
  isLoading: boolean;
  loadingText: string;
  text: string;
}) => {
  if (!isLoading) {
    return text;
  }
  return (
    <span className="flex gap-2">
      <Spinner className="w-4" />
      {loadingText}
    </span>
  );
};

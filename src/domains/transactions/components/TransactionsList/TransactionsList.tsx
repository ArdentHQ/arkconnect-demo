import { useTranslation } from "next-i18next";
import { TransactionListItem } from "./TransactionListItem";
import { TransactionData } from "@/app/lib/Transactions/contracts";
import { WalletData } from "@/app/lib/Wallet/contracts";
import { isTruthy } from "@/app/utils/isTruthy";

export const TransactionsList = ({
  transactions,
  walletData,
  isLoading,
}: {
  transactions: TransactionData[];
  walletData: WalletData;
  isLoading?: boolean;
}) => {
  const { t } = useTranslation("transactions");

  if (!isTruthy(isLoading) && transactions.length === 0) {
    return <div className="p-4 text-center">{t("NO_TRANSACTIONS")}</div>;
  }

  return (
    <div className="flex flex-col space-y-2">
      {transactions.map((transaction) => (
        <TransactionListItem
          transaction={transaction}
          walletData={walletData}
          key={transaction.id}
        />
      ))}
    </div>
  );
};

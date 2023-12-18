import { useTranslation } from "next-i18next";
import { TransactionTableRow } from "./TransactionTableRow";
import { Table } from "@/app/components/Table";
import { TransactionData } from "@/app/lib/Transactions/contracts";
import { WalletData } from "@/app/lib/Wallet/contracts";
import { isTruthy } from "@/app/utils/isTruthy";

export const TransactionsTable = ({
  transactions,
  walletData,
  isLoading,
}: {
  transactions: TransactionData[];
  walletData: WalletData;
  isLoading?: boolean;
}) => {
  const { t } = useTranslation("transactions");

  const columns = [
    {
      accessorKey: "id",
      header: () => t("TX_ID"),
      className: "text-left",
    },
    {
      accessorKey: "age",
      header: () => t("AGE"),
      className: "text-left hidden lg:table-cell",
    },
    {
      accessorKey: "type",
      header: () => t("TYPE"),
      className: "text-left",
    },
    {
      accessorKey: "addressing",
      header: () => t("ADDRESSING"),
      className: "text-left",
    },
    {
      accessorKey: "value",
      header: () => t("VALUE_ARK"),
      className: "text-right",
    },
    {
      accessorKey: "fee",
      header: () => t("FEE_ARK"),
      className: "text-right",
    },
  ];

  if (!isTruthy(isLoading) && transactions.length === 0) {
    return <div className="p-4 text-center">{t("NO_TRANSACTIONS")}</div>;
  }

  return (
    <Table
      columns={columns}
      data={transactions}
      row={(transaction) => (
        <TransactionTableRow
          transaction={transaction}
          walletData={walletData}
        />
      )}
    />
  );
};

import { Table } from "@/app/components/Table";
import { TransactionData } from "@/app/lib/Transactions/contracts";
import { TransactionTableRow } from "./TransactionTableRow";
import { useTranslation } from "next-i18next";
import { WalletData } from "@/app/lib/Wallet/contracts";

export const TransactionsTable = ({
  transactions,
  walletData,
}: {
  transactions: TransactionData[];
  walletData: WalletData;
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

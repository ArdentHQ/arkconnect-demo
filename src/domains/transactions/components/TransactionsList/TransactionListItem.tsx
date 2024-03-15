import { useTranslation } from "next-i18next";

import {
  TransactionAddress,
  TransactionAmount,
} from "@/domains/transactions/components/TransactionsTable/TransactionTableRow.blocks";
import { Transaction } from "@/app/lib/Transaction/factory";
import { TransactionData } from "@/app/lib/Transactions/contracts";
import { WalletData } from "@/app/lib/Wallet/contracts";
import { TruncateMiddle } from "@/app/components/Truncate";
import { Link } from "@/app/components/Link";

export const TransactionListItem = ({
  walletData,
  transaction,
}: {
  walletData: WalletData;
  transaction: TransactionData;
}) => {
  const tx = Transaction({
    transaction,
    address: walletData.address,
    network: walletData.network,
  });

  const { t } = useTranslation("transactions");

  return (
    <div className="border rounded-2.5xl border-[#d3d3d3] flex flex-col overflow-hidden bg-white dark:border-theme-gray-700 dark:bg-subtle-black">
      <div className="bg-theme-gray-100 px-4 py-3 justify-between flex dark:bg-theme-gray-700">
        <Link
          href={tx.explorerLink()}
          target="_blank"
          className="max-w-[8rem] block w-full"
        >
          <TruncateMiddle>{tx.id()}</TruncateMiddle>
        </Link>
        <span className="text-sm text-black font-medium dark:text-white">
          {tx.timestamp().timeAgo()}
        </span>
      </div>

      <div className="pt-3 px-4 pb-4 flex-col flex sm:flex-row justify-between  space-y-5 sm:space-y-0">
        <div className="flex flex-col space-y-2">
          <span className="text-sm text-theme-gray-500 font-medium dark:text-theme-gray-300">
            {tx.isVote() && t("VOTE", { ns: "common" })}
            {tx.isTransfer() && t("TRANSFER", { ns: "common" })}
            {tx.isContract() && t("CONTRACT", { ns: "common" })}
          </span>

          <div className="flex items-center space-x-2">
            <TransactionAddress transaction={tx} />
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-sm text-theme-gray-500 font-medium dark:text-theme-gray-300">
            {t("VALUE_ARK")}
          </span>
          <div>
            <TransactionAmount transaction={tx} />
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-sm text-theme-gray-500 font-medium dark:text-theme-gray-300">
            {t("FEE_ARK")}
          </span>

          <div className="text-sm dark:text-white">{tx.fee().toCrypto()}</div>
        </div>
      </div>
    </div>
  );
};

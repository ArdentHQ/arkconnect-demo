import { useTranslation } from "next-i18next";
import {
  TransactionAddress,
  TransactionAmount,
} from "./TransactionTableRow.blocks";

import { Label } from "@/app/components/Label";
import { Link } from "@/app/components/Link";
import { TableCell, TableRow } from "@/app/components/Table";
import { TruncateMiddle } from "@/app/components/Truncate";
import { Transaction } from "@/app/lib/Transaction/factory";
import { TransactionData } from "@/app/lib/Transactions/contracts";
import { WalletData } from "@/app/lib/Wallet/contracts";

export const TransactionTableRow = ({
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

  const { t } = useTranslation();

  return (
    <TableRow>
      <>
        <TableCell>
          <Link
            href={tx.explorerLink()}
            target="_blank"
            className="max-w-[8rem] block w-full"
          >
            <TruncateMiddle>{tx.id()}</TruncateMiddle>
          </Link>

          <div className="text-theme-gray-500 text-xs font-medium leading-[125%] block lg:hidden">
            {tx.timestamp().timeAgo()}
          </div>
        </TableCell>

        <TableCell className="hidden lg:table-cell text-sm text-black font-medium leading-[125%]">
          {tx.timestamp().timeAgo()}
        </TableCell>

        <TableCell>
          <Label className="text-xs">
            {tx.isVote() && t("VOTE")}
            {tx.isTransfer() && t("TRANSFER")}
            {tx.isContract() && t("CONTRACT")}
          </Label>
        </TableCell>

        <TableCell>
          <div className="flex items-center space-x-2">
            <TransactionAddress transaction={tx} />
          </div>
        </TableCell>

        <TableCell>
          <div className="flex justify-end">
            <TransactionAmount transaction={tx} />
          </div>
        </TableCell>

        <TableCell>
          <div className="flex justify-end text-sm text-black font-medium leading-[125%]">
            {tx.fee().toCrypto()}
          </div>
        </TableCell>
      </>
    </TableRow>
  );
};

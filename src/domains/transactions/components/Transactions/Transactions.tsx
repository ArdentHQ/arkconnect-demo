import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { Wallet } from "@/app/lib/Wallet";
import { WalletData } from "@/app/lib/Wallet/contracts";
import { isTruthy } from "@/app/utils/isTruthy";
import { TransactionsTable } from "@/domains/transactions/components/TransactionsTable";
import { H3 } from "@/app/components/Typography";

export const Transactions = ({ walletData }: { walletData: WalletData }) => {
  const { t } = useTranslation("transactions");

  const { data: transactions } = useQuery({
    staleTime: 0,
    initialData: [],
    enabled: isTruthy(walletData),
    queryKey: ["wallet-transactions-1"],
    queryFn: async () => {
      const wallet = Wallet(walletData);
      await wallet.transactions().sync(10);

      return wallet.transactions().items();
    },
    refetchInterval: 5000,
  });

  return (
    <div className="bg-white sm:rounded-2.5xl sm:mt-6 sm:shadow-sm">
      <div className="px-6 py-6 pb-4">
        <H3>{t("LATEST_10_TRANSACTIONS")}</H3>
      </div>
      <TransactionsTable transactions={transactions} walletData={walletData} />
    </div>
  );
};

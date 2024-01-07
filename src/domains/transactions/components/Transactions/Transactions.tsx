import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { TransactionsList } from "@/domains/transactions/components/TransactionsList";
import { Wallet } from "@/app/lib/Wallet";
import { WalletData } from "@/app/lib/Wallet/contracts";
import { isTruthy } from "@/app/utils/isTruthy";
import { TransactionsTable } from "@/domains/transactions/components/TransactionsTable";

export const Transactions = ({ walletData }: { walletData: WalletData }) => {
  const { t } = useTranslation("transactions");

  const { data: transactions, isLoading } = useQuery({
    staleTime: 0,
    initialData: [],
    enabled: isTruthy(walletData),
    queryKey: ["wallet-transactions", walletData.address],
    queryFn: async () => {
      const wallet = Wallet(walletData);
      await wallet.transactions().sync();

      return wallet.transactions().items();
    },
    refetchInterval: 3000,
  });

  return (
    <div className="md:bg-white md:rounded-2.5xl md:mt-6 md:shadow-sm">
      <div className="px-6 py-6 pb-4">
        <h3 className="break-words md:text-xl md:leading-[1.563rem] font-medium">
          {t("LATEST_10_TRANSACTIONS")}
        </h3>
      </div>

      <div className="hidden md:block">
        <TransactionsTable
          transactions={transactions}
          walletData={walletData}
          isLoading={isLoading}
        />
      </div>

      <div className="md:hidden px-6">
        <TransactionsList
          transactions={transactions}
          walletData={walletData}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

import { useTranslation } from "next-i18next";
import { TruncateMiddle } from "@/app/components/Truncate";
import Copy from "@/public/icons/copy.svg";

const WalletAddress = ({ wallet }: { wallet: any }) => {
  const { t } = useTranslation();
  return (
    <div className="w-[700px]">
      <p>{t("CONNECTED_WITH_ARK_CONNECT")}</p>
      <div className="flex items-end justify-between">
        <TruncateMiddle>{wallet.address}</TruncateMiddle>

        <div className="flex items-end space-x-2">
          <Copy className="w-4" />
          <Copy className="w-4" />
          <Copy className="w-4" />
        </div>
      </div>
    </div>
  );
};

export const WalletOverview = ({ wallet }: { wallet: any }) => {
  return (
    <div className="bg-white rounded-3xl mt-6 shadow-sm">
      <div className="flex items-center">
        <WalletAddress wallet={wallet} />
      </div>
    </div>
  );
};

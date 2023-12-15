import { useTranslation } from "next-i18next";
import { TruncateMiddle } from "@/app/components/Truncate";
import Copy from "@/public/icons/copy.svg";
import Explorer from "@/public/icons/explorer.svg";
import Checkmark from "@/public/icons/checkmark.svg";
import { RoundButton } from "@/app/components/Button";

const WalletAddress = ({ wallet }: { wallet: any }) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-end justify-between w-full p-6">
      <div>
        <p className="text-theme-gray-500 font-medium text-sm leading-[0.938rem] mb-[0.563rem]">
          {t("CONNECTED_WITH_ARK_CONNECT")}
        </p>

        <p className="leading-[1.25rem] w-full font-medium">
          <TruncateMiddle>{wallet.address}</TruncateMiddle>
        </p>
      </div>

      <div className="flex items-end justify-between">
        <div className="flex items-end space-x-2">
          <RoundButton>
            <Copy className="w-[1.125rem]" />
          </RoundButton>

          <RoundButton>
            <Explorer className="w-[1.125rem]" />
          </RoundButton>

          <RoundButton>
            <Checkmark className="w-[1.125rem]" />
          </RoundButton>
        </div>
      </div>
    </div>
  );
};

export const WalletOverview = ({ wallet }: { wallet: any }) => {
  return (
    <div className="bg-white rounded-2.5xl mt-6 shadow-sm">
      <div className="flex items-center">
        <WalletAddress wallet={wallet} />
      </div>
    </div>
  );
};

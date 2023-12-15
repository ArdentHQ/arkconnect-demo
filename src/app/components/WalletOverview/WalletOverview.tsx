import { useTranslation } from "next-i18next";
import { TruncateMiddle } from "@/app/components/Truncate";
import Copy from "@/public/icons/copy.svg";
import Explorer from "@/public/icons/explorer.svg";
import CheckSquare from "@/public/icons/check-square.svg";
import { RoundButton, RoundLinkButton } from "@/app/components/Button";
import { Clipboard } from "../Clipboard";
import { Network } from "@/app/lib";
import { WalletData } from "@/app/hooks/useWallet.contracts";

const WalletAddress = ({ wallet }: { wallet: WalletData }) => {
  const { t } = useTranslation();

  const network = Network({ network: wallet.network });

  return (
    <div className="flex items-end justify-between w-full p-6">
      <div>
        <p className="text-theme-gray-500 font-medium text-sm leading-[0.938rem] mb-[0.563rem]">
          {t("CONNECTED_WITH_ARK_CONNECT")}
        </p>

        <div className="leading-[1.25rem] w-full font-medium font-sans">
          <TruncateMiddle>{wallet.address}</TruncateMiddle>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div className="flex items-end space-x-2">
          <Clipboard text={wallet.address}>
            <RoundButton variant="transparent">
              <Copy className="w-[1.125rem]" />
            </RoundButton>
          </Clipboard>

          <RoundLinkButton
            variant="transparent"
            href={network.walletExplorerLink(wallet.address)}
            isExternal
          >
            <Explorer className="w-[1.125rem]" />
          </RoundLinkButton>

          <RoundButton variant="transparent" disabled>
            <CheckSquare className="w-[1.125rem]" />
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

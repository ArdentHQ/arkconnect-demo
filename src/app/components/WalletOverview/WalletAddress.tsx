import { useTranslation } from "next-i18next";
import { TruncateMiddle } from "@/app/components/Truncate";
import Copy from "@/public/icons/copy.svg";
import Explorer from "@/public/icons/explorer.svg";
import CheckSquare from "@/public/icons/check-square.svg";
import { RoundButton, RoundLinkButton } from "@/app/components/Button";
import { Clipboard } from "@/app/components/Clipboard";
import { Network } from "@/app/lib/Network";
import { WalletOverviewProperties } from "./WalletOverview.contracts";

export const WalletAddress = ({ walletData }: WalletOverviewProperties) => {
  const { t } = useTranslation();

  const network = Network({ network: walletData.network });

  return (
    <div className="flex items-end justify-between w-full p-6 sm:p-5">
      <div className="w-full">
        <p className="text-theme-gray-500 font-medium text-sm leading-[0.938rem] mb-[0.563rem]">
          <span className="hidden lg:block">
            {t("CONNECTED_WITH_ARK_CONNECT")}
          </span>
          <span className="block lg:hidden">{t("CONNECTED")}</span>
        </p>

        <div className="leading-[1.25rem] font-medium font-sans w-2/3 xs:3/4 sm:w-full">
          <TruncateMiddle>{walletData.address}</TruncateMiddle>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div className="flex items-end space-x-2">
          <Clipboard text={walletData.address}>
            <RoundButton variant="transparent">
              <Copy className="w-[1.125rem]" />
            </RoundButton>
          </Clipboard>

          <RoundLinkButton
            variant="transparent"
            href={network.walletExplorerLink(walletData.address)}
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

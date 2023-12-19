import assert from "assert";
import { useTranslation } from "next-i18next";
import classNames from "classnames";
import { Dropdown, DropdownItem } from "@/app/components/Dropdown";
import ChevronDown from "@/public/icons/chevron-down.svg";
import { useWallet } from "@/app/hooks";
import { NetworkType } from "@/app/lib/Network";

const CurrentNetworkButton = ({
  open,
  currentNetwork,
}: {
  open: boolean;
  currentNetwork: NetworkType;
}) => {
  const { t } = useTranslation();
  return (
    <button
      type="button"
      className="bg-theme-gray-100 px-6 text-black font-medium text-sm justify-between flex items-center w-full py-[7px]"
    >
      <span>
        {currentNetwork === NetworkType.MAINNET ? t("MAINNET") : t("DEVNET")}
      </span>

      <ChevronDown
        className={classNames("w-3 mr-4 transition-default", {
          "rotate-180": open,
        })}
      />
    </button>
  );
};

export const NetworkToggleMobile = () => {
  const { t } = useTranslation();

  const { wallet, changeAddress } = useWallet();

  assert(wallet);

  return (
    <Dropdown
      className="sm:hidden w-full"
      menuClassName="w-full"
      trigger={({ open }) => (
        <CurrentNetworkButton open={open} currentNetwork={wallet.network} />
      )}
    >
      <DropdownItem>
        <button
          type="button"
          className={classNames(
            "group flex w-full items-center px-8 py-4 leading-[1.3rem] font-medium space-x-3",
            {
              "bg-theme-primary-100": wallet.network === NetworkType.MAINNET,
            },
          )}
          onClick={() => {
            void changeAddress({
              network: NetworkType.MAINNET,
            });
          }}
        >
          {t("MAINNET")}
        </button>
      </DropdownItem>

      <DropdownItem>
        <button
          className={classNames(
            "group flex w-full items-center px-8 py-4 leading-[1.3rem] font-medium space-x-3",
            {
              "bg-theme-primary-100": wallet.network === NetworkType.DEVNET,
            },
          )}
          onClick={() => {
            void changeAddress({
              network: NetworkType.DEVNET,
            });
          }}
        >
          {t("DEVNET")}
        </button>
      </DropdownItem>
    </Dropdown>
  );
};

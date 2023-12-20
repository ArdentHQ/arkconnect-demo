import { useTranslation } from "next-i18next";
import classNames from "classnames";
import { NavbarButton } from "@/app/components/Button";
import { Dropdown, DropdownButtonItem } from "@/app/components/Dropdown";
import ChevronDown from "@/public/icons/chevron-down.svg";
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
    <NavbarButton>
      <span className="max-w-[8.75rem] flex items-center">
        <span>
          {currentNetwork === NetworkType.MAINNET ? t("MAINNET") : t("DEVNET")}
        </span>

        <ChevronDown
          className={classNames(
            "w-3 ml-4 transition-default group-hover:text-white text-black",
            {
              "rotate-180": open,
            },
          )}
        />
      </span>
    </NavbarButton>
  );
};

export const NetworkToggle = ({
  networks = [NetworkType.DEVNET, NetworkType.MAINNET],
  currentNetwork = NetworkType.DEVNET,
  onChange,
}: {
  onChange?: (network: NetworkType) => void;
  networks?: NetworkType[];
  currentNetwork?: NetworkType;
}) => {
  const { t } = useTranslation();

  return (
    <Dropdown
      className="hidden sm:block"
      trigger={({ open }) => (
        <CurrentNetworkButton open={open} currentNetwork={currentNetwork} />
      )}
    >
      <>
        {networks.map((network) => (
          <DropdownButtonItem
            key={network}
            isSelected={currentNetwork === network}
            onClick={() => {
              onChange?.(network);
            }}
          >
            {t(network)}
          </DropdownButtonItem>
        ))}
      </>
    </Dropdown>
  );
};

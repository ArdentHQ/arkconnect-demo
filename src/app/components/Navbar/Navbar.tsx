import Link from "next/link";
import { useTranslation } from "next-i18next";
import { ReactElement } from "react";
import Logo from "@/public/images/logo.svg";
import Logout from "@/public/icons/logout.svg";
import { Button, NavbarButton } from "@/app/components/Button";
import { useWallet } from "@/app/hooks";
import { UserMenu } from "@/app/components/UserMenu";
import { Spinner } from "@/app/components/Spinner";
import { isTruthy } from "@/app/utils/isTruthy";
import { NetworkToggle } from "@/app/components/NetworkToggle";
import { NetworkToggleMobile } from "@/app/components/NetworkToggleMobile";
import { NetworkType } from "@/app/lib/Network";
import { WalletData } from "@/app/lib/Wallet/contracts";

interface NavbarProperties {
  wallet: WalletData;
  onDisconnect: () => void;
  onNetworkChange?: (network: NetworkType) => void;
}

const NavbarWrapper = ({ children }: { children: ReactElement }) => {
  return (
    <nav className="sticky inset-x-0 top-0 bg-white min-h-[4rem] flex items-center border-b md:border-none border-theme-gray-100 z-10">
      <ul className="flex justify-between items-center container mx-auto px-6 whitespace-nowrap">
        <li>
          <Link href="/" className="w-36 sm:w-48 block">
            <Logo />
          </Link>
        </li>

        <>{children}</>
      </ul>
    </nav>
  );
};

const NavbarConnected = ({
  wallet,
  onDisconnect,
  onNetworkChange,
}: NavbarProperties) => (
  <NavbarWrapper>
    <li className="flex items-center justify-end space-x-2">
      <NetworkToggle
        onChange={onNetworkChange}
        currentNetwork={wallet.network}
      />

      <UserMenu
        address={wallet.address}
        onDisconnect={() => {
          void onDisconnect();
        }}
      />

      <div className="hidden sm:block">
        <NavbarButton
          onClick={() => {
            void onDisconnect();
          }}
        >
          <Logout className="w-4" />
        </NavbarButton>
      </div>
    </li>
  </NavbarWrapper>
);

const NavbarConnecting = () => {
  const { t } = useTranslation();
  const { wallet, setNetwork } = useWallet();

  return (
    <NavbarWrapper>
      <li className="flex items-center justify-end space-x-2">
        <NetworkToggle currentNetwork={wallet.network} onChange={setNetwork} />
        <Button disabled className="space-x-2 flex items-center">
          <Spinner className="w-4" />
          <span>{t("CONNECTING")}</span>
        </Button>
      </li>
    </NavbarWrapper>
  );
};

export const Navbar = () => {
  const { t } = useTranslation();
  const {
    isConnected,
    connect,
    wallet,
    disconnect,
    isConnecting,
    isLoading,
    changeAddress,
    setNetwork,
    isInstalled,
  } = useWallet();

  if (isLoading) {
    return (
      <NavbarWrapper>
        <Spinner className="w-8" />
      </NavbarWrapper>
    );
  }

  if (isConnected && isTruthy(wallet)) {
    return (
      <>
        <NavbarConnected
          wallet={wallet}
          onDisconnect={() => {
            void disconnect();
          }}
          onNetworkChange={(network) => {
            void changeAddress({ network });
          }}
        />
        <NetworkToggleMobile />
      </>
    );
  }

  if (isConnecting) {
    return <NavbarConnecting />;
  }

  return (
    <>
      <NavbarWrapper>
        <li className="flex items-center justify-end space-x-2">
          {isInstalled && (
            <NetworkToggle
              currentNetwork={wallet.network}
              onChange={setNetwork}
            />
          )}

          <Button
            disabled={!isInstalled}
            className="hidden sm:block"
            onClick={() => {
              void connect();
            }}
          >
            {t("CONNECT_WALLET")}
          </Button>

          <Button
            disabled={!isInstalled}
            className="block sm:hidden"
            onClick={() => {
              void connect();
            }}
          >
            {t("CONNECT")}
          </Button>
        </li>
      </NavbarWrapper>
    </>
  );
};

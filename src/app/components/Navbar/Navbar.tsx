import Link from "next/link";
import { useTranslation } from "next-i18next";
import { ReactElement, useState } from "react";
import LogoLight from "@/public/images/logo-light.svg";
import LogoDark from "@/public/images/logo-dark.svg";
import SmallLogo from "@/public/icons/logo.svg";
import Moon from "@/public/icons/moon.svg";
import Sun from "@/public/icons/sun.svg";
import { Button, NavbarButton } from "@/app/components/Button";
import { UserMenu } from "@/app/components/UserMenu";
import { Spinner } from "@/app/components/Spinner";
import { isTruthy } from "@/app/utils/isTruthy";
import { NetworkType } from "@/app/lib/Network";
import { WalletData } from "@/app/lib/Wallet/contracts";
import { Dialog } from "@/app/components/Dialog";
import { useArkConnectContext } from "@/app/contexts/useArkConnectContext";
import { useDarkMode } from "@/app/contexts/useDarkModeContext";

interface NavbarProperties {
  wallet: WalletData;
  onDisconnect: () => void;
}

const NetworkBox = ({ network }: { network: NetworkType }) => {
  return (
    <span className="px-4 hidden sm:block py-[0.625rem] max-w-[8.75rem] rounded-2xl text-black font-medium text-sm bg-theme-primary-100 active:bg-theme-primary-100 hover:bg-theme-primary-100 focus:outline-none min-h-[2.5rem] border border-transparent dark:border-theme-primary-600 dark:bg-subtle-black dark:hover:bg-dark-green dark:text-theme-primary-600 cursor-default transition-default">
      {network}
    </span>
  );
};

const NavbarWrapper = ({ children }: { children: ReactElement }) => {
  const { darkMode } = useDarkMode();

  return (
    <nav className="sticky inset-x-0 top-0 bg-white min-h-[4rem] flex items-center border-b md:border-none border-theme-gray-100 z-10 dark:bg-subtle-black dark:border-theme-gray-700">
      <ul className="flex justify-between items-center container mx-auto px-6 whitespace-nowrap">
        <li>
          <Link href="/" className="block h-6 sm:w-48 w-6">
            <span className="hidden sm:block">
              {darkMode ? <LogoDark /> : <LogoLight />}
            </span>

            <span className="sm:hidden">
              <SmallLogo className="text-theme-primary-700 dark:text-theme-primary-600 h-6 w-6 transition-default" />
            </span>
          </Link>
        </li>

        <>{children}</>
      </ul>
    </nav>
  );
};

const DarkModeToggleButton = (): JSX.Element => {
  const { toggleDarkMode, darkMode } = useDarkMode();

  return (
    <NavbarButton
      onClick={() => {
        void toggleDarkMode();
      }}
    >
      {darkMode ? <Moon className="w-4" /> : <Sun className="w-4" />}
    </NavbarButton>
  );
};

const NavbarConnected = ({ wallet, onDisconnect }: NavbarProperties) => {
  return (
    <NavbarWrapper>
      <li className="flex items-center justify-end space-x-2">
        <NetworkBox network={wallet.network} />
        <UserMenu
          address={wallet.address}
          onDisconnect={() => {
            void onDisconnect();
          }}
        />

        <DarkModeToggleButton />
      </li>
    </NavbarWrapper>
  );
};

const NavbarConnecting = () => {
  const { t } = useTranslation();

  return (
    <NavbarWrapper>
      <li className="flex items-center justify-end space-x-2">
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
  const [changeAddressError, setChangeAddressError] = useState<string>();

  const {
    isConnected,
    connect,
    wallet,
    disconnect,
    isConnecting,
    isLoading,
    isInstalled,
  } = useArkConnectContext();

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
        />

        <Dialog
          showActionButtons={false}
          title={t("NETWORK_SWITCH_ERROR_TITLE")}
          show={!!changeAddressError}
          onClose={() => {
            setChangeAddressError(undefined);
          }}
        >
          <p className="text-lg">{changeAddressError}</p>
        </Dialog>
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

          <DarkModeToggleButton />
        </li>
      </NavbarWrapper>
    </>
  );
};

import Link from "next/link";
import { useTranslation } from "next-i18next";
import Logo from "@/public/images/logo.svg";
import Logout from "@/public/icons/logout.svg";
import { Button, NavbarButton } from "@/app/components/Button";
import { useWallet } from "@/app/hooks";
import { UserMenu } from "@/app/components/UserMenu";
import { ReactElement } from "react";
import Spinner from "@/public/icons/spinner.svg";

interface NavbarProperties {
  address: string;
  onDisconnect: () => void;
}

const NavbarWrapper = ({ children }: { children: ReactElement }) => {
  return (
    <nav className="sticky inset-x-0 top-0 bg-white min-h-[4rem] flex items-center border-b md:border-none border-theme-secondary-300">
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

const NavbarConnected = ({ address, onDisconnect }: NavbarProperties) => (
  <NavbarWrapper>
    <li className="flex items-center justify-end space-x-2">
      <UserMenu address={address} onDisconnect={onDisconnect} />

      <div className="hidden sm:block">
        <NavbarButton onClick={onDisconnect}>
          <Logout className="w-4" />
        </NavbarButton>
      </div>
    </li>
  </NavbarWrapper>
);

export const NavbarConnecting = () => {
  const { t } = useTranslation();

  return (
    <NavbarWrapper>
      <li>
        <Button disabled className="space-x-2 flex items-center">
          <Spinner className="animate-spin w-4 text-theme-primary-700" />
          <span>{t("CONNECTING")}</span>
        </Button>
      </li>
    </NavbarWrapper>
  );
};

export const Navbar = () => {
  const { t } = useTranslation();
  const { isConnected, connect, address, disconnect, isConnecting } =
    useWallet();

  if (isConnected) {
    return <NavbarConnected address={address} onDisconnect={disconnect} />;
  }

  if (isConnecting) {
    return <NavbarConnecting />;
  }

  return (
    <NavbarWrapper>
      <li className="flex items-center justify-end">
        <Button className="hidden sm:block" onClick={connect}>
          {t("CONNECT_WALLET")}
        </Button>

        <Button className="block sm:hidden" onClick={connect}>
          {t("CONNECT")}
        </Button>
      </li>
    </NavbarWrapper>
  );
};

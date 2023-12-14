import Link from "next/link";
import { useTranslation } from "next-i18next";
import Logo from "@/public/images/logo.svg";
import Logout from "@/public/icons/logout.svg";
import { Button } from "@/app/components/Button";
import { useWallet } from "@/app/hooks";
import { UserMenu } from "../UserMenu";
import { ReactElement } from "react";

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

const NavbarConnected = ({
  address,
  onDisconnect,
}: {
  address: string;
  onDisconnect: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <NavbarWrapper>
      <li className="flex items-center justify-end space-x-2">
        <UserMenu address={address} onDisconnect={onDisconnect} />

        <Button
          onClick={onDisconnect}
          className="px-3 bg-theme-primary-100 text-black font-medium text-sm hidden sm:block"
        >
          <Logout className="w-4" />
        </Button>
      </li>
    </NavbarWrapper>
  );
};

export const Navbar = () => {
  const { t } = useTranslation();
  const { isConnected, connect, address, disconnect } = useWallet();

  if (isConnected) {
    return <NavbarConnected address={address} onDisconnect={disconnect} />;
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

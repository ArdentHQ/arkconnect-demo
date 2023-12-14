import Link from "next/link";
import { useTranslation } from "next-i18next";
import Logo from "@/public/images/logo.svg";
import Logout from "@/public/icons/logout.svg";
import { Button } from "@/app/components/Button";
import { useWallet } from "@/app/hooks";
import { TruncateMiddle } from "../Truncate";
import { Dropdown } from "../Dropdown";

const AddressButton = ({
  address,
  className,
}: {
  address: string;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <button className="px-4 py-[0.625rem] rounded-2xl bg-theme-primary-100 text-black font-medium text-sm">
      <span>
        <TruncateMiddle
          text={address}
          length={12}
          className="hidden sm:block"
        />
        <TruncateMiddle text={address} length={6} className="block sm:hidden" />
      </span>
    </button>
  );
};

export const Navbar = () => {
  const { t } = useTranslation();
  const { isConnected, connect, address } = useWallet();

  return (
    <nav className="sticky inset-x-0 top-0 bg-white min-h-[4rem] flex items-center border-b md:border-none border-theme-secondary-300">
      <ul className="flex justify-between items-center container mx-auto px-6 whitespace-nowrap">
        <li>
          <Link href="/" className="w-36 sm:w-48 block">
            <Logo />
          </Link>
        </li>

        {!isConnected && (
          <li className="flex items-center justify-end">
            <Button className="hidden sm:block" onClick={connect}>
              {t("CONNECT_WALLET")}
            </Button>

            <Button className="block sm:hidden" onClick={connect}>
              {t("CONNECT")}
            </Button>
          </li>
        )}

        {isConnected && (
          <>
            <li className="flex items-center justify-end space-x-2">
              <AddressButton address={address} onClick={connect} />

              <Button
                onClick={connect}
                className="px-3 bg-theme-primary-100 text-black font-medium text-sm hidden sm:block"
              >
                <Logout className="w-4" />
              </Button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

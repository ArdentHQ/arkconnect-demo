import Link from "next/link";
import { useTranslation } from "next-i18next";
import Logo from "@/public/images/logo.svg";
import { Button } from "@/app/components/Button";

export const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="sticky inset-x-0 top-0 bg-white min-h-[4rem] flex items-center border-b md:border-none border-theme-secondary-300">
      <ul className="flex justify-between items-center container mx-auto px-6 whitespace-nowrap">
        <li>
          <Link href="/" className="w-36 sm:w-48 block">
            <Logo />
          </Link>
        </li>

        <li className="flex items-center justify-end">
          <Button className="hidden sm:block">{t("CONNECT_WALLET")}</Button>
          <Button className="block sm:hidden">{t("CONNECT")}</Button>
        </li>
      </ul>
    </nav>
  );
};

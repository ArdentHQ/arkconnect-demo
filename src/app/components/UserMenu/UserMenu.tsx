import { useTranslation } from "next-i18next";
import { TruncateMiddle } from "@/app/components/Truncate";
import { NavbarButton } from "@/app/components/Button";
import { Dropdown, DropdownItem } from "@/app/components/Dropdown";
import Logout from "@/public/icons/logout.svg";

const AddressButton = ({
  address,
  onClick,
}: {
  address?: string;
  onClick?: () => void;
}) => (
  <NavbarButton onClick={onClick} className="group">
    <span className="max-w-[94px]">
      <TruncateMiddle key={address} className="group-hover:no-underline">
        {address}
      </TruncateMiddle>
    </span>
    <span className="group-hover:text-theme-primary-500 transition-default">
      |
    </span>
    <Logout className="w-4" />
  </NavbarButton>
);

export const UserMenu = ({
  address,
  onDisconnect,
}: {
  address?: string;
  onDisconnect?: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <>
      <span className="hidden sm:block">
        <AddressButton address={address} onClick={onDisconnect} />
      </span>

      <Dropdown
        className="sm:hidden"
        trigger={<AddressButton address={address} onClick={onDisconnect} />}
      >
        <DropdownItem>
          <button
            onClick={onDisconnect}
            className="group flex w-full items-center px-8 py-4 leading-[1.3rem] font-medium space-x-3"
          >
            <Logout className="w-4" />
            <span>{t("DISCONNECT_WALLET")}</span>
          </button>
        </DropdownItem>
      </Dropdown>
    </>
  );
};

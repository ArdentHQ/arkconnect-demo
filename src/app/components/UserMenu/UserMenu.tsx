import { useTranslation } from "next-i18next";
import { twMerge } from "tailwind-merge";
import { TruncateMiddle } from "@/app/components/Truncate";
import { NavbarButton } from "@/app/components/Button";
import { Dropdown, DropdownItem } from "@/app/components/Dropdown";
import Logout from "@/public/icons/logout.svg";

const AddressButton = ({
  address,
}: {
  address?: string;
  onClick?: () => void;
}) => (
  <NavbarButton>
    <span className="max-w-[8.75rem]">
      <TruncateMiddle>{address}</TruncateMiddle>
    </span>
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
      <span
        className={twMerge(
          "px-4 hidden sm:block py-[0.625rem] max-w-[8.75rem] rounded-2xl text-black font-medium text-sm bg-theme-primary-100 active:bg-theme-primary-100 hover:bg-theme-primary-100 !border-none focus:outline-none min-h-[2.5rem]",
        )}
      >
        <TruncateMiddle>{address}</TruncateMiddle>
      </span>

      <Dropdown
        className="sm:hidden"
        trigger={<AddressButton address={address} />}
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

import { TruncateMiddle } from "../Truncate";
import Logout from "@/public/icons/logout.svg";
import { Dropdown, DropdownItem } from "@/app/components/Dropdown";
import { NavbarButton } from "../Button";

const AddressButton = ({
  address,
}: {
  address: string;
  onClick?: () => void;
}) => (
  <NavbarButton>
    <TruncateMiddle text={address} length={12} className="hidden sm:block" />
    <TruncateMiddle text={address} length={6} className="block sm:hidden" />
  </NavbarButton>
);

export const UserMenu = ({
  address,
  onDisconnect,
}: {
  address: string;
  onDisconnect?: () => void;
}) => (
  <Dropdown trigger={<AddressButton address={address} />}>
    <DropdownItem>
      <button
        onClick={onDisconnect}
        className="group flex w-full items-center px-8 py-4 leading-[1.3rem] font-medium space-x-3"
      >
        <Logout className="w-4" />
        <span>Disconnect wallet</span>
      </button>
    </DropdownItem>
  </Dropdown>
);

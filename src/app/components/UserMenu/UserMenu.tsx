import { TruncateMiddle } from "../Truncate";
import Logout from "@/public/icons/logout.svg";
import { Dropdown, DropdownItems } from "../Dropdown";

const AddressButton = ({
  address,
}: {
  address: string;
  onClick?: () => void;
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

export const UserMenu = ({
  address,
  onDisconnect,
}: {
  address: string;
  onDisconnect?: () => void;
}) => {
  return (
    <Dropdown trigger={<AddressButton address={address} />}>
      <DropdownItems>
        <button
          onClick={onDisconnect}
          className="group flex w-full items-center px-8 py-4 leading-[1.3rem] font-medium space-x-3"
        >
          <Logout className="w-4" />
          <span>Disconnect wallet</span>
        </button>
      </DropdownItems>
    </Dropdown>
  );
};

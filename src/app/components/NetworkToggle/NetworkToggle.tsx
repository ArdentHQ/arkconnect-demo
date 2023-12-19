import { useTranslation } from "next-i18next";
import classNames from "classnames";
import { NavbarButton } from "@/app/components/Button";
import { Dropdown, DropdownItem } from "@/app/components/Dropdown";
import ChevronDown from "@/public/icons/chevron-down.svg";
const CurrentNetworkButton = ({ open }: { open: boolean }) => {
  const { t } = useTranslation();
  return (
    <NavbarButton>
      <span className="max-w-[8.75rem] flex items-center ">
        <span>{t("MAINNET")}</span>

        <ChevronDown
          className={classNames(
            "w-3 ml-4 transition-default group-hover:text-white text-black",
            {
              "rotate-180": open,
            },
          )}
        />
      </span>
    </NavbarButton>
  );
};

export const NetworkToggle = () => {
  const { t } = useTranslation();

  return (
    <Dropdown trigger={({ open }) => <CurrentNetworkButton open={open} />}>
      <DropdownItem>
        <button className="group flex w-full items-center px-8 py-4 leading-[1.3rem] font-medium space-x-3">
          {t("MAINNET")}
        </button>
      </DropdownItem>
      <DropdownItem>
        <button className="group flex w-full items-center px-8 py-4 leading-[1.3rem] font-medium space-x-3">
          {t("DEVNET")}
        </button>
      </DropdownItem>
    </Dropdown>
  );
};

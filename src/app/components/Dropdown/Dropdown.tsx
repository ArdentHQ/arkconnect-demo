import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Fragment, ReactElement } from "react";

export const Dropdown = ({
  className,
  children,
  trigger,
  menuClassName = "static sm:relative inline-block text-left",
}: {
  children?: JSX.Element | JSX.Element[] | string;
  trigger?: JSX.Element | (({ open }: { open: boolean }) => JSX.Element);
  className?: string;
  menuClassName?: string;
}) => {
  return (
    <div className={className}>
      <Menu
        as="div"
        className={classNames(
          "static sm:relative inline-block text-left",
          menuClassName,
        )}
      >
        {({ open }) => (
          <>
            <Menu.Button as="span">
              {typeof trigger === "function" ? trigger({ open }) : trigger}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-50"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="mx-6 sm:mx-0 absolute right-0 mt-6 left-0 sm:left-auto origin-top-right rounded-lg bg-white shadow-xl focus:outline-none overflow-hidden">
                {children}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};

export const DropdownItem = ({
  children,
}: {
  children: ReactElement | string;
}) => <Menu.Item>{children}</Menu.Item>;

export const DropdownButtonItem = ({
  onClick,
  children,
  isSelected,
}: {
  isSelected?: boolean;
  onClick?: () => void;
  children?: ReactElement | string;
}) => {
  return (
    <DropdownItem>
      <button
        type="button"
        className={classNames(
          "group flex w-full items-center px-8 py-4 leading-[1.3rem] font-medium space-x-3  hover:bg-theme-primary-600 hover:text-white",
          {
            "bg-theme-primary-100": isSelected,
          },
        )}
        onClick={onClick}
      >
        {children}
      </button>
    </DropdownItem>
  );
};

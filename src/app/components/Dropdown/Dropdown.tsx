import { Menu, Transition } from "@headlessui/react";
import { Fragment, ReactElement } from "react";

export const Dropdown = ({
  children,
  trigger,
}: {
  children?: ReactElement | string;
  trigger?: ReactElement;
}) => {
  return (
    <div>
      <Menu as="div" className="static sm:relative inline-block text-left">
        <Menu.Button>{trigger}</Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-50"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="mx-6 sm:mx-0 absolute right-0 mt-6 left-0 sm:left-auto origin-top-right rounded-lg bg-white shadow-xl focus:outline-none">
            {children}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export const DropdownItems = ({
  children,
}: {
  children: ReactElement | string;
}) => {
  return <Menu.Item>{children}</Menu.Item>;
};

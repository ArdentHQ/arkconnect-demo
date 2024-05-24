import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { useButtonClasses, ButtonVariant } from "./hooks/useButtonClasses";
import { Spinner } from "@/app/components/Spinner";

interface ButtonCustomProperties {
  variant?: ButtonVariant;
  busy?: boolean;
  isExternal?: boolean;
  hoverClassName?: string;
  disabled?: boolean;
}

type LinkButtonProperties = ButtonCustomProperties &
  AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProperties = ButtonCustomProperties &
  ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  className,
  hoverClassName,
  variant = "primary",
  busy = false,
  disabled = false,
  children,
  ...properties
}: ButtonProperties) => {
  const {
    padding,
    base,
    colors,
    disabled: disabledClass,
    hover,
  } = useButtonClasses({
    variant,
    busy,
    hoverClassName,
  });

  return (
    <button
      type="button"
      className={twMerge(
        base,
        padding,
        colors,
        disabledClass,
        hover,
        className,
      )}
      disabled={disabled || busy}
      {...properties}
    >
      {busy ? <Spinner className="w-4 h-4" /> : children}
    </button>
  );
};

export const LinkButton = ({
  className,
  isExternal,
  variant = "primary",
  disabled,
  hoverClassName,
  ...properties
}: LinkButtonProperties) => {
  const {
    padding,
    base,
    colors,
    disabled: disabledClass,
    hover,
  } = useButtonClasses({
    variant,
    disabled,
    hoverClassName,
  });

  return (
    <a
      target={isExternal ? "_blank" : "_self"}
      className={twMerge(
        base,
        padding,
        colors,
        disabledClass,
        hover,
        className,
      )}
      {...properties}
    />
  );
};

export const RoundButton = (properties: ButtonProperties) => (
  <Button
    {...properties}
    className="p-[0.438rem] rounded-full text-sm aspect-square dark:text-white focus-visible:border focus-visible:border-theme-primary-600 disabled:text-theme-gray-500"
    hoverClassName="hover:bg-theme-gray-100 dark:hover:bg-theme-gray-700"
  />
);

export const RoundLinkButton = (properties: LinkButtonProperties) => (
  <LinkButton
    {...properties}
    className="p-[0.438rem] rounded-full text-sm dark:text-white focus-visible:border focus-visible:border-theme-primary-600 disabled:text-theme-gray-500"
    hoverClassName="hover:bg-theme-gray-100 dark:hover:bg-theme-gray-700"
  />
);

// TODO: Define & add hover/focus states
export const NavbarButton = ({
  className,
  ...properties
}: ButtonProperties) => (
  <Button
    className={twMerge(
      "px-4 py-[0.625rem] rounded-2xl text-black font-medium text-sm bg-theme-primary-100 active:bg-theme-primary-100 hover:bg-theme-primary-500 hover:text-white hover:border-theme-primary-500 border border-transparent focus:outline-none min-h-[2.5rem] group dark:border-theme-dark-primary-500 dark:bg-subtle-black dark:hover:bg-theme-dark-primary-900 dark:text-theme-dark-primary-500 transition-default",
      className,
    )}
    {...properties}
  />
);

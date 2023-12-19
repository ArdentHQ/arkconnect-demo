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
  } = useButtonClasses({
    variant,
    disabled,
    hoverClassName,
  });

  return (
    <a
      target={isExternal ? "_blank" : "_self"}
      className={twMerge(base, padding, colors, disabledClass, className)}
      {...properties}
    />
  );
};

export const RoundButton = (properties: ButtonProperties) => (
  <Button
    {...properties}
    className="p-[0.438rem] rounded-full text-sm aspect-square"
    hoverClassName="hover:bg-theme-gray-100"
  />
);

export const RoundLinkButton = (properties: LinkButtonProperties) => (
  <LinkButton
    {...properties}
    className="p-[0.438rem] rounded-full text-sm"
    hoverClassName="hover:bg-theme-gray-100"
  />
);

// TODO: Define & add hover/focus states
export const NavbarButton = ({
  className,
  ...properties
}: ButtonProperties) => (
  <Button
    className={twMerge(
      "px-4 py-[0.625rem] rounded-2xl text-black font-medium text-sm bg-theme-primary-100 active:bg-theme-primary-100 hover:bg-theme-primary-600 hover:text-white hover:border-theme-primary-600 !border-none focus:outline-none min-h-[2.5rem] group",
      className,
    )}
    {...properties}
  />
);

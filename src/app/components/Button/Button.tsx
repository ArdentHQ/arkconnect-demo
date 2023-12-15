import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { useButtonClasses, ButtonVariant } from "./hooks/useButtonClasses";
import { Spinner } from "@/app/components/Spinner";

interface ButtonProperties {
  variant?: ButtonVariant;
  busy?: boolean;
  isExternal?: boolean;
}

export const Button = ({
  className,
  variant = "primary",
  busy = false,
  disabled = false,
  children,
  ...properties
}: ButtonProperties & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const {
    padding,
    base,
    colors,
    disabled: disabledClass,
  } = useButtonClasses({
    variant,
    busy,
  });

  return (
    <button
      type="button"
      className={twMerge(base, padding, colors, disabledClass, className)}
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
  ...properties
}: ButtonProperties & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const { padding, base, colors, disabled } = useButtonClasses({
    variant: "primary",
  });

  return (
    <a
      target={isExternal ? "_blank" : "_self"}
      className={twMerge(base, padding, colors, disabled, className)}
      {...properties}
    />
  );
};

// TODO: Define & add hover/focus states
export const NavbarButton = ({
  className,
  ...properties
}: ButtonProperties & ButtonHTMLAttributes<HTMLButtonElement>) => (
  <Button
    className={twMerge(
      "px-4 py-[0.625rem] rounded-2xl text-black font-medium text-sm bg-theme-primary-100 active:bg-theme-primary-100 hover:bg-theme-primary-100 !border-none focus:outline-none",
      className,
    )}
    {...properties}
  />
);

export const RoundButton = ({
  className,
  variant = "primary",
  ...properties
}: ButtonProperties & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { colors, disabled } = useButtonClasses({ variant });

  return (
    <button
      className={twMerge(
        colors,
        disabled,
        "p-[0.438rem] rounded-full text-sm aspect-square",
        className,
      )}
      {...properties}
    />
  );
};

export const RoundLinkButton = ({
  className,
  variant = "primary",
  isExternal,
  ...properties
}: ButtonProperties & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const { colors, disabled } = useButtonClasses({ variant });

  return (
    <a
      target={isExternal ? "_blank" : "_self"}
      className={twMerge(
        colors,
        disabled,
        "p-[0.438rem] rounded-full text-sm",
        className,
      )}
      {...properties}
    />
  );
};

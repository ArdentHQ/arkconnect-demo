import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { useButtonClasses, ButtonVariant } from "./hooks/useButtonClasses";
import { Spinner } from "@/app/components/Spinner";

interface ButtonProperties {
  variant?: ButtonVariant;
  busy?: boolean;
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

export const ExternalButtonLink = ({
  className,
  ...properties
}: ButtonProperties & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const { padding, base, colors, disabled } = useButtonClasses({
    variant: "primary",
  });

  return (
    <a
      target="_blank"
      className={twMerge(base, padding, colors, disabled, className)}
      {...properties}
    />
  );
};

export const NavbarButton = (
  properties: ButtonProperties & ButtonHTMLAttributes<HTMLButtonElement>,
) => (
  <Button
    className="px-4 py-[0.625rem] rounded-2xl bg-theme-primary-100 text-black font-medium text-sm active:bg-theme-primary-100 hover:bg-theme-primary-100"
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
        "p-[0.438rem] rounded-full text-sm",
        className,
      )}
      {...properties}
    />
  );
};

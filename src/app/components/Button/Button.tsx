import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { useButtonClasses } from "./hooks/useButtonClasses";
import { ButtonVariant } from "./Button.contracts";

interface ButtonProperties {
  variant?: ButtonVariant;
}

export const Button = ({
  className,
  variant = "primary",
  ...properties
}: ButtonProperties & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { padding, base, colors, disabled } = useButtonClasses({ variant });

  return (
    <button
      type="button"
      className={twMerge(base, padding, colors, disabled, className)}
      {...properties}
    />
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

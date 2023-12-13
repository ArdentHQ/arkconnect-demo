import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { useButtonClasses } from "./hooks/useButtonClasses";

interface ButtonProperties {
  variant?: "primary";
}

export const Button = ({
  className,
  variant = "primary",
  ...properties
}: ButtonProperties & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { padding, base, colors } = useButtonClasses({ variant });

  return (
    <button
      type="button"
      className={twMerge(base, padding, colors, className)}
      {...properties}
    />
  );
};

export const ExternalButtonLink = ({
  className,
  ...properties
}: ButtonProperties & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const { padding, base, colors } = useButtonClasses({ variant: "primary" });

  return (
    <a
      target="_blank"
      className={twMerge(base, padding, colors, className)}
      {...properties}
    />
  );
};

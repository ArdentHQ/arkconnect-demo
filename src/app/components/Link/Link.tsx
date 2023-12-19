import { AnchorHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import NextLink from "next/link";

type LinkProperties = {
  href: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link = ({ href, className, ...properties }: LinkProperties) => {
  return (
    <NextLink
      href={href}
      {...properties}
      className={twMerge(
        "text-theme-primary-700 text-sm font-medium leading-[125%] hover:text-theme-primary-600 group hover:underline transition-default focus:outline-none focus:shadow-outline-primary",
        className,
      )}
    />
  );
};

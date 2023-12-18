import { ReactElement } from "react";
import { twMerge } from "tailwind-merge";

export const H3 = ({
  className,
  children,
}: {
  className?: string;
  children: ReactElement | string;
}) => {
  return (
    <h3
      className={twMerge(
        className,
        "break-words text-xl leading-[1.563rem] font-medium",
      )}
    >
      {children}
    </h3>
  );
};

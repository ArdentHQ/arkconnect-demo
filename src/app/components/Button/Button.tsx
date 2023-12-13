import { ButtonHTMLAttributes } from "react";
import cn from "classnames";

export const Button = ({
  children,
  onClick,
  className,
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  // TODO: adjust based on variants.
  const paddingClasses = "py-[0.625rem] px-[1.25rem]";
  const colorClasses =
    "bg-theme-primary-700 hover:bg-theme-primary-800 text-white focus:outline-none focus:shadow-outline-primary active:bg-theme-primary-900";

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "inline-flex justify-center items-center gap-2 font-bold rounded-2xl",
        paddingClasses,
        colorClasses,
        className,
      )}
    >
      <span>{children}</span>
    </button>
  );
};

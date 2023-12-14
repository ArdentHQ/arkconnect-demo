import SpinnerIcon from "@/public/icons/spinner.svg";
import { twMerge } from "tailwind-merge";

export const Spinner = ({ className }: { className: string }) => (
  <SpinnerIcon
    className={twMerge("animate-spin w-4 text-theme-primary-700", className)}
  />
);

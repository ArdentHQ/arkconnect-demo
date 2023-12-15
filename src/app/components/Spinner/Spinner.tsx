import { twMerge } from "tailwind-merge";
import SpinnerIcon from "@/public/icons/spinner.svg";

export const Spinner = ({ className }: { className: string }) => (
  <SpinnerIcon
    className={twMerge("animate-spin w-4 text-theme-primary-700", className)}
  />
);
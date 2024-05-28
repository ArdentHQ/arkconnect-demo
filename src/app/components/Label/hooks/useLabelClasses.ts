import { LabelVariant } from "@/app/components/Label/Label.contracts";

export const useLabelClasses = ({ variant }: { variant: LabelVariant }) => {
  const base = "rounded-[0.25rem] text-center min-w-[2.5rem] inline-block";
  const padding = "px-1 py-[0.1875rem] dark:py-0.5";
  const colors = {
    info: "bg-theme-gray-100 text-theme-gray-500 font-medium leading-[125%] dark:bg-theme-gray-700 dark:text-theme-gray-300",
    warning:
      "bg-theme-warning-100 text-theme-warning-600 font-medium leading-[125%] dark:bg-transparent dark:text-[#F39B9B] dark:border dark:border-[#AA6868]",
    success:
      "bg-theme-primary-green-100 text-theme-primary-green-700 font-medium leading-[125%] dark:bg-transparent dark:text-theme-primary-green-600 dark:border dark:border-theme-primary-green-600",
    danger:
      "bg-theme-error-50 text-theme-error-600 font-medium leading-[125%] dark:bg-theme-error-800/[55%] dark:text-theme-error-500",
  };

  return {
    base,
    padding,
    colors: colors[variant],
  };
};

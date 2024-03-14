import { LabelVariant } from "@/app/components/Label/Label.contracts";

export const useLabelClasses = ({ variant }: { variant: LabelVariant }) => {
  const base = "rounded-[0.25rem] text-center min-w-[2.5rem] inline-block";
  const padding = "px-1 py-[0.188rem]";
  const colors = {
    info: "bg-theme-gray-100 text-theme-gray-500 font-medium leading-[125%] dark:bg-theme-gray-700 dark:text-theme-gray-300",
    warning:
      "bg-theme-warning-100 text-theme-warning-600 font-medium leading-[125%] dark:bg-transparent dark:text-[#F39B9B] dark:outline dark:outline-[#AA6868]",
    success:
      "bg-theme-primary-100 text-theme-primary-700 font-medium leading-[125%] dark:bg-transparent dark:text-theme-primary-600 dark:outline dark:outline-theme-primary-600",
    danger: "bg-theme-error-50 text-theme-error-600 font-medium leading-[125%]",
  };

  return {
    base,
    padding,
    colors: colors[variant],
  };
};

export type ButtonVariant = "primary" | "secondary";

export const useButtonClasses = ({
  variant,
  busy,
}: {
  variant: ButtonVariant;
  busy?: boolean;
}): {
  disabled: string;
  base: string;
  padding: string;
  colors: string;
  busy: string
} => {
  const colors = {
    primary:
      "enabled:bg-theme-primary-700 enabled:hover:bg-theme-primary-600 enabled:hover:border-theme-primary-600 enabled:text-white focus:outline-none focus:shadow-outline-primary enabled:border-theme-primary-700",
    secondary:
      "enabled:bg-white enabled:hover:bg-theme-primary-50 enabled:text-theme-primary-700 focus:outline-none focus:shadow-outline-primary enabled:border-theme-primary-700",
  };

  const disabled = {
    primary:
      "disabled:bg-theme-gray-100 disabled:border-theme-gray-100 disabled:text-theme-gray-400",
    secondary: "disabled:text-theme-gray-300 disabled:border-theme-gray-100",
  };

  const base =
    "flex justify-between items-center font-bold rounded-2xl whitespace-nowrap space-x-[0.6rem] leading-[1.25rem] min-h-[2.5rem] transition-default border";

  const padding = "py-[0.625rem] px-[1.25rem]";

  return {
    disabled: busy
      ? "disabled:bg-theme-primary-700 disabled:border-theme-primary-700"
      : disabled[variant],
    base,
    colors: colors[variant],
    padding,
  };
};

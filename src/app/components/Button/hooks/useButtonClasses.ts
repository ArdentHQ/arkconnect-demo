export type ButtonVariant =
  | "primary"
  | "secondary"
  | "transparent"
  | "secondary-bordered";

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
} => {
  const colors = {
    primary:
      "bg-theme-primary-700 hover:bg-theme-primary-600 hover:border-theme-primary-600 text-white focus:outline-none focus:shadow-outline-primary border-theme-primary-700",
    secondary:
      "border border-white bg-white hover:bg-theme-primary-50 text-theme-primary-700 focus:outline-none focus:shadow-outline-primary",
    "secondary-bordered": "border border-white",
    transparent:
      "border-transparent bg-transparent hover:bg-theme-gray-50 focus:bg-transparent focus:border-theme-primary-700",
  };

  const disabled = {
    primary:
      "disabled:bg-theme-gray-100 disabled:border-theme-gray-100 disabled:text-theme-gray-400",
    secondary: "disabled:text-theme-gray-300 disabled:border-theme-gray-100",
    "secondary-bordered":
      "disabled:text-theme-gray-300 disabled:border-theme-gray-300",
    transparent:
      "disabled:text-theme-gray-400 disabled:focus:border-none disabled:bg-transparent",
  };

  const base =
    "flex justify-center items-center font-bold rounded-2xl whitespace-nowrap space-x-[0.6rem] leading-[1.25rem] transition-default border";

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

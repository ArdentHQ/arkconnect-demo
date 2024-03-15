export type ButtonVariant =
  | "primary"
  | "secondary"
  | "transparent"
  | "primary-bordered"
  | "secondary-bordered";

export const useButtonClasses = ({
  variant,
  busy,
  hoverClassName,
  disabled,
}: {
  disabled?: boolean;
  variant: ButtonVariant;
  busy?: boolean;
  hoverClassName?: string;
}): {
  disabled: string;
  base: string;
  padding: string;
  colors: string;
  hover: string;
} => {
  const colors = {
    primary:
      "bg-theme-primary-700 text-white border-theme-primary-700 dark:bg-theme-primary-600 dark:border-theme-primary-600",
    secondary:
      "border border-white bg-white text-theme-primary-700 dark:bg-theme-primary-600 dark:border-theme-primary-600 dark:text-white",
    "secondary-bordered": "border border-white",
    transparent:
      "border-transparent bg-transparent focus-visible:bg-transparent focus-visible:border-theme-primary-700",
    "primary-bordered":
      "dark:border-theme-primary-600 dark:text-theme-primary-600 dark:hover:!bg-dark-green",
  };

  let disabledClass: {
    primary: string;
    secondary: string;
    "secondary-bordered": string;
    transparent: string;
  };

  // Links doesn't have disabled property so we need to handle it differently
  if (disabled) {
    disabledClass = {
      primary: "bg-theme-gray-100 border-theme-gray-100 text-theme-gray-400",
      secondary: "text-theme-gray-300 border-theme-gray-100",
      "secondary-bordered": "text-theme-gray-300 border-theme-gray-300",
      transparent: "text-theme-gray-400 focus:border-none bg-transparent",
    };
  } else {
    disabledClass = {
      primary:
        "disabled:bg-theme-gray-100 disabled:border-theme-gray-100 disabled:text-theme-gray-400 dark:disabled:bg-theme-gray-600 dark:disabled:border-theme-gray-600 dark:disabled:text-theme-gray-300",
      secondary: "disabled:text-theme-gray-300 disabled:border-theme-gray-100",
      "secondary-bordered":
        "disabled:text-theme-gray-300 disabled:border-theme-gray-300",
      transparent:
        "disabled:text-theme-gray-400 disabled:focus:border-none disabled:bg-transparent",
    };
  }

  const base =
    "flex justify-center items-center font-bold rounded-2xl whitespace-nowrap space-x-[0.6rem] leading-[1.25rem] transition-default border focus:outline-none focus:shadow-outline-primary";

  const padding = "py-[0.625rem] px-[1.25rem]";

  const hover =
    hoverClassName ??
    "hover:bg-theme-primary-600 hover:text-white hover:border-theme-primary-600 dark:hover:bg-theme-primary-700 dark:hover:border-theme-primary-700";

  return {
    disabled: busy
      ? "disabled:bg-theme-primary-700 disabled:border-theme-primary-700"
      : disabledClass[variant],
    base: base,
    colors: colors[variant],
    padding,
    hover,
  };
};

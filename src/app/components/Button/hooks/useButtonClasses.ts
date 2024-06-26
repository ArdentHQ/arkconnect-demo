export type ButtonVariant =
  | "primary"
  | "secondary"
  | "transparent"
  | "secondary-bordered"
  | "secondary-transparent";

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
      "bg-theme-primary-600 text-white border-theme-primary-600 dark:bg-theme-dark-primary-600 dark:border-theme-dark-primary-600 focus-visible:shadow-button dark:focus-visible:shadow-[#2B3D35]",
    secondary:
      "border border-theme-primary-700 bg-white text-theme-primary-700 border-theme-primary-700 dark:bg-theme-dark-primary-600 dark:border-theme-primary-600 dark:text-white focus-visible:shadow-button dark:focus-visible:shadow-[#2B3D35]",
    "secondary-bordered":
      "border border-theme-primary-400 dark:border-theme-dark-primary-400",
    transparent:
      "border-transparent bg-transparent focus-visible:bg-transparent focus-visible:border-theme-primary-600",
    "secondary-transparent":
      "border-theme-primary-600 text-theme-primary-600 bg-transparent focus-visible:bg-transparent focus-visible:border-theme-primary-600 dark:border-theme-dark-primary-600 dark:text-theme-dark-primary-600",
  };

  let disabledClass: {
    primary: string;
    secondary: string;
    "secondary-bordered": string;
    "secondary-transparent": string;
    transparent: string;
  };

  // Links doesn't have disabled property so we need to handle it differently
  if (disabled) {
    disabledClass = {
      primary: "bg-theme-gray-100 border-theme-gray-100 text-theme-gray-400",
      secondary: "text-theme-gray-300 border-theme-gray-100",
      "secondary-bordered": "text-theme-gray-300 border-theme-gray-300",
      "secondary-transparent": "text-theme-gray-300 border-theme-gray-100",
      transparent: "text-theme-gray-400 focus:border-none bg-transparent",
    };
  } else {
    disabledClass = {
      primary:
        "disabled:bg-theme-gray-100 disabled:border-theme-gray-100 disabled:text-theme-gray-400 dark:disabled:bg-theme-gray-600 dark:disabled:border-theme-gray-600 dark:disabled:text-theme-gray-300",
      secondary: "disabled:text-theme-gray-300 disabled:border-theme-gray-100",
      "secondary-transparent":
        "disabled:text-theme-gray-300 disabled:border-theme-gray-100",
      "secondary-bordered":
        "disabled:text-theme-gray-300 disabled:border-theme-gray-300",
      transparent:
        "disabled:text-theme-gray-400 disabled:focus:border-none disabled:bg-transparent",
    };
  }

  const base =
    "flex justify-center items-center font-bold rounded-2xl whitespace-nowrap space-x-[0.6rem] leading-[1.25rem] transition-default border focus:outline-none focus-visible:ring-2 ring-offset-1 ring-theme-gray-300";

  const padding = "py-[0.625rem] px-[1.25rem]";

  const hover =
    hoverClassName ??
    "hover:bg-theme-primary-500 hover:text-white hover:border-theme-primary-500 dark:hover:bg-theme-dark-primary-500 dark:hover:text-white";

  return {
    disabled: busy
      ? "disabled:bg-theme-primary-600 disabled:border-theme-primary-600"
      : disabledClass[variant],
    base: base,
    colors: colors[variant],
    padding,
    hover,
  };
};

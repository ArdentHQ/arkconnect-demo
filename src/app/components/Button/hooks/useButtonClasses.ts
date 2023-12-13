export const useButtonClasses = ({
  variant,
}: {
  variant: "primary";
}): {
  base: string;
  padding: string;
  colors: string;
} => {
  const base =
    "flex justify-between items-center font-bold rounded-2xl whitespace-nowrap space-x-[0.6rem]";

  const padding = "py-[0.625rem] px-[1.25rem]";

  const colors =
    "bg-theme-primary-700 hover:bg-theme-primary-800 text-white focus:outline-none focus:shadow-outline-primary active:bg-theme-primary-900";

  return {
    base,
    colors,
    padding,
  };
};

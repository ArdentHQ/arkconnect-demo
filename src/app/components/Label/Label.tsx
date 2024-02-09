import { twMerge } from "tailwind-merge";
import { LabelProperties } from "./Label.contracts";
import { useLabelClasses } from "./hooks/useLabelClasses";

export const Label = ({
  className,
  variant = "info",
  ...properties
}: LabelProperties) => {
  const { base, padding, colors } = useLabelClasses({
    variant,
  });

  return (
    <div
      {...properties}
      className={twMerge(base, padding, colors, className)}
    />
  );
};

import { twMerge } from "tailwind-merge";
import { LabelProperties } from "./Label.contracts";
import { useLabelClasses } from "./hooks/useLabelClasses";

export const Label = ({
  className,
  variant = "info",
  size,
  ...properties
}: LabelProperties) => {
  const { base, padding, colors, textSize } = useLabelClasses({
    variant,
    size,
  });

  return (
    <div
      {...properties}
      className={twMerge(base, padding, colors, textSize, className)}
    />
  );
};

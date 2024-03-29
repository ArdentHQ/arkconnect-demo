import Tippy, { type TippyProps } from "@tippyjs/react";
import cn from "classnames";
import { roundArrow } from "tippy.js";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away-subtle.css";
import "tippy.js/dist/svg-arrow.css";
import { useTooltip } from "@/app/components/Tooltip/hooks/useTooltip";

interface Properties extends TippyProps {
  variant?: "default" | "danger";
  hideAfter?: number;
}

export const Tooltip = ({
  className,
  offset,
  variant = "default",
  hideAfter,
  ...properties
}: Properties): JSX.Element => {
  const { handleShow } = useTooltip({ hideAfter });

  return (
    <Tippy
      animation="shift-away-subtle"
      offset={offset ?? [0, 7]}
      arrow={roundArrow}
      duration={150}
      className={cn(
        "p-2 font-sans text-sm font-medium text-theme-secondary-200 dark:text-theme-dark-800",
        "break-words [&.tippy-box]:rounded-lg [&.tippy-box]:leading-5.5 [&_.tippy-content]:p-0", // to unset some of Tippy default styles...
        className,
        {
          "[&.tippy-box>.tippy-svg-arrow]:fill-theme-secondary-900 dark:[&.tippy-box>.tippy-svg-arrow]:fill-theme-gray-500 [&.tippy-box]:bg-theme-secondary-900 dark:[&.tippy-box]:dark:bg-theme-gray-500 dark:[&.tippy-box]:text-white":
            variant === "default",
          "[&.tippy-box>.tippy-svg-arrow]:fill-theme-danger-400 [&.tippy-box]:bg-theme-danger-400 [&.tippy-box]:text-white":
            variant === "danger",
        },
      )}
      onShown={handleShow}
      {...properties}
    />
  );
};

import cn from "classnames";
import { HTMLAttributes, useRef } from "react";
import { useTranslation } from "next-i18next";

import { Placement, ReferenceElement } from "tippy.js";
import { useClipboard } from "./hooks/useClipboard";
import { Tooltip } from "@/app/components/Tooltip";
import { useBreakpoint } from "@/app/hooks/useBreakpoint";

export interface ClipboardProperties extends HTMLAttributes<HTMLDivElement> {
  text: string;
  tooltipTitle?: React.ReactNode;
  zIndex?: number;
  tooltipPlacement?: Placement;
}

export const Clipboard = ({
  text,
  children,
  className,
  tooltipTitle,
  zIndex,
  tooltipPlacement,
}: ClipboardProperties): JSX.Element => {
  const { t } = useTranslation();
  const reference = useRef<(ReferenceElement & HTMLDivElement) | null>(null);

  const { isCopied, copy } = useClipboard({
    reference,
    resetAfter: 1000,
  });

  const { isTouch } = useBreakpoint();

  const title = tooltipTitle ?? t("COPY_CLIPBOARD");

  return (
    <Tooltip
      content={isCopied ? t("COPIED") : title}
      hideOnClick={false}
      trigger={isTouch ? "click" : "mouseenter focus"}
      hideAfter={isTouch ? 1000 : undefined}
      zIndex={zIndex}
      placement={tooltipPlacement}
      touch
    >
      <div
        ref={reference}
        onClick={() => {
          void copy(text);
        }}
        className={cn("flex items-center transition", className)}
        data-testid="Clipboard"
      >
        <div className={cn("transition-default grid cursor-pointer")}>
          {children}
        </div>
      </div>
    </Tooltip>
  );
};

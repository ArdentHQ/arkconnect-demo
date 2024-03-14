import { ReactElement } from "react";
import MiddleEllispis from "react-middle-ellipsis";
import cn from "classnames";

export const TruncateMiddle = ({
  children,
  className,
}: {
  children?: ReactElement | string;
  className?: string;
}): JSX.Element => (
  <MiddleEllispis>
    <span
      className={cn(
        "inline-block group-hover:underline transition-default",
        className,
      )}
    >
      {children}
    </span>
  </MiddleEllispis>
);

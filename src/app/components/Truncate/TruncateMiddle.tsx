import { ReactElement } from "react";
import MiddleEllispis from "react-middle-ellipsis";

interface Properties {
  children?: ReactElement | string;
  className?: string;
}

export const TruncateMiddle = ({
  children,
  className,
}: Properties): JSX.Element => {
  return (
    <MiddleEllispis>
      <span>{children}</span>
    </MiddleEllispis>
  );
};

import { ReactElement } from "react";
import MiddleEllispis from "react-middle-ellipsis";

export const TruncateMiddle = ({
  children,
}: {
  children?: ReactElement | string;
}): JSX.Element => (
  <MiddleEllispis>
    <span className="inline-block">{children}</span>
  </MiddleEllispis>
);

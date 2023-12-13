import { HTMLAttributes } from "react";

type AlertProperties = HTMLAttributes<HTMLElement> & {
  type?: "success" | "error";
};

const AlertSuccess = (properties: HTMLAttributes<HTMLElement>): JSX.Element => (
  <div
    className="border-t border-theme-primary-600 bg-theme-primary-100 text-theme-primary-700 text-sm px-8 py-3"
    {...properties}
  />
);

const AlertError = (properties: HTMLAttributes<HTMLElement>): JSX.Element => (
  <div
    className="border-t border-theme-danger-600 bg-theme-danger-100 text-theme-danger-700 text-sm px-8 py-3"
    {...properties}
  />
);

export const Alert = ({
  type = "success",
  ...properties
}: AlertProperties): JSX.Element => {
  if (type === "error") {
    return <AlertError {...properties} />;
  }

  return <AlertSuccess {...properties} />;
};

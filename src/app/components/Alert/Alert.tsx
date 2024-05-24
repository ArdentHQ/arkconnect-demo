import { HTMLAttributes } from "react";

type AlertProperties = HTMLAttributes<HTMLElement> & {
  type?: "success" | "error";
};

const AlertSuccess = (properties: HTMLAttributes<HTMLElement>): JSX.Element => (
  <div
    className="border-t border-theme-primary-600 bg-theme-primary-100 text-theme-primary-700 text-sm px-8 py-3 dark:bg-theme-dark-primary-600/20 dark:text-theme-dark-primary-600 dark:border-theme-dark-primary-600"
    {...properties}
  />
);

const AlertError = (properties: HTMLAttributes<HTMLElement>): JSX.Element => (
  <div
    className="border-t border-t-theme-error-700 bg-theme-error-100 text-theme-error-700 text-sm px-8 py-3 dark:bg-theme-error-800/20 dark:text-theme-error-500 dark:border-t-theme-error-700"
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

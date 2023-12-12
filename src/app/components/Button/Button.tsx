import { ReactElement } from "react";

interface ButtonProperties {
  children: ReactElement;
  onClick: () => void;
}

export const Button = ({ children, onClick }: ButtonProperties) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
    >
      <>{children}</>
    </button>
  );
};

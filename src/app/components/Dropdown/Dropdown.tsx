import { ReactElement } from "react";

export const Dropdown = ({
  children,
  trigger,
}: {
  children?: ReactElement;
  trigger?: ReactElement;
}) => {
  return (
    <div className="hs-dropdown relative inline-flex">
      <button
        id="hs-dropdown-default"
        type="button"
        className="hs-dropdown-toggle px-4 py-1 inline-flex justify-center items-center gap-2 rounded-md font-medium align-middle hover:bg-gray-50 focus:outline-none transition-all text-sm dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white"
      >
        <>{trigger}</>
      </button>

      <div
        className="hs-dropdown-menu hidden transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 divide-y divide-gray-200 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700"
        aria-labelledby="hs-dropdown-default"
      >
        <>{children}</>
      </div>
    </div>
  );
};

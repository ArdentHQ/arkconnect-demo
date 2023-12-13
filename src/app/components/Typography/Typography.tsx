import { ReactElement } from "react";

export const H3 = ({ children }: { children: ReactElement | string }) => {
  return (
    <h3 className="break-words text-xl leading-[1.563rem] font-medium mb-2">
      {children}
    </h3>
  );
};

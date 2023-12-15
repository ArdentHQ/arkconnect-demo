import { ReactElement } from "react";
import { Navbar } from "@/app/components/Navbar";

export const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <div id="layout" className="flex flex-col">
      <Navbar />
      {children}
    </div>
  );
};

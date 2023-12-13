import { ReactElement } from "react";
import { Navbar } from "@/app/components/Navbar";

export const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="flex flex-col">
      <Navbar />
      {children}
    </div>
  );
};

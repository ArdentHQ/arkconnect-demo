import React, { ReactElement } from "react";
import { Navbar } from "@/app/components/Navbar";
import { Toaster } from "react-hot-toast";

export const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <div id="layout" className="flex flex-col min-h-screen">
      <Navbar />
      {children}
      <Toaster position="bottom-right" gutter={15} />
    </div>
  );
};

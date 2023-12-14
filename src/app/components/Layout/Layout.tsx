import { ReactElement } from "react";
import cn from "classnames";
import { Navbar } from "@/app/components/Navbar";
import { useModalContext } from "@/app/contexts/ModalContext/ModalContext";

export const Layout = ({ children }: { children: ReactElement }) => {
  const { modalOpened } = useModalContext();

  return (
    <div
      className={cn("flex flex-col", {
        blur: modalOpened,
      })}
    >
      <Navbar />
      {children}
    </div>
  );
};

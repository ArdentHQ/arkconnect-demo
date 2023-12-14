import { createContext, useContext, useState } from "react";

interface ContextProperties {
  setModalOpened: (opened: boolean) => void;
  modalOpened: boolean;
}

interface ProviderProperties {
  children: React.ReactNode;
}

const ModalContext = createContext<ContextProperties | undefined>(undefined);

export const ModalContextProvider = ({
  children,
}: ProviderProperties): JSX.Element => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  return (
    <ModalContext.Provider
      value={{
        modalOpened,
        setModalOpened,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = (): ContextProperties => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error(
      "useModalContext must be used within a ModalContextProvider",
    );
  }

  return context;
};

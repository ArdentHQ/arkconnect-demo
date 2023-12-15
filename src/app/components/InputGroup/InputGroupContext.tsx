import { createContext, useContext } from "react";
import { InputGroupContextType } from "./InputGroup.contracts";

export const InputGroupContext = createContext<
  InputGroupContextType | undefined
>(undefined);

export const useInputGroupContext = (): InputGroupContextType => {
  return useContext(InputGroupContext) ?? {};
};

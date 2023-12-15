import { createContext, useContext } from "react";
import { InputIconContextType } from "./InputIcon.contracts";

export const InputIconContext = createContext<InputIconContextType | undefined>(
  undefined,
);

export const useInputIconContext = (): InputIconContextType => {
  return useContext(InputIconContext) ?? {};
};

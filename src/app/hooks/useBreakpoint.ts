import { isTruthy } from "@/app/utils/isTruthy";

export const useBreakpoint = (): { isTouch: boolean } => {
  return {
    isTouch: isTruthy(matchMedia("(any-hover: none)").matches),
  };
};

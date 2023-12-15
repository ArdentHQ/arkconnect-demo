import { isTruthy } from "@/app/utils/isTruthy";

export const useBreakpoint = (): { isTouch: boolean } => {
  return {
    isTouch: isTruthy(window.matchMedia("(any-hover: none)").matches),
  };
};

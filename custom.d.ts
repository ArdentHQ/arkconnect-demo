import { Ethereum } from "@/app/hooks/useMetaMask.contracts";

export {};

declare global {
  interface Window {
    ethereum?: Ethereum;
  }
}

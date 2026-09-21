import { Ethereum } from "@/app/hooks/useMetaMask.contracts";

declare global {
  interface Window {
    ethereum?: Ethereum;
  }
}

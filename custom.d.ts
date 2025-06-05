import { ArkConnectExtension } from "@/app/lib/Network";
import { Ethereum } from "@/app/hooks/useMetaMask.contracts";

export {};

declare global {
  interface Window {
    arkconnect?: ArkConnectExtension;
    ethereum?: Ethereum;
  }
}

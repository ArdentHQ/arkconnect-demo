import { ArkConnectExtension } from "@/app/lib/Network";

export {};

interface EthereumProvider {
  request(...arguments_: any): Promise<any>;
}

declare global {
  interface Window {
    arkconnect?: ArkConnectExtension;
    ethereum?: EthereumProvider;
  }
}

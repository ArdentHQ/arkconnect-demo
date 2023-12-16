import { SignTransactionRequest, SignTransactionResponse } from "@/app/lib";

export {};

declare global {
  interface Window {
    arkconnect?: {
      connect: () => Promise<void>;
      disconnect: () => Promise<void>;
      isConnected: () => Promise<boolean>;
      getAddress: () => Promise<string>;
      getNetwork: () => Promise<string>;
      getBalance: () => Promise<string>;
      signTransaction: (
        transactionRequest: SignTransactionRequest,
      ) => Promise<SignTransactionResponse>;
      loaded: boolean;
    };
  }
}

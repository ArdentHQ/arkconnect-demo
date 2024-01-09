import {
  NetworkType,
  SignTransactionResponse,
  SignTransactionRequest,
  ChangeAddressRequest,
  ChangeAddressResponse,
  SignVoteRequest,
  SignVoteResponse,
  ConnectRequest,
} from "@/app/lib/Network";

export {};

declare global {
  interface Window {
    arkconnect?: {
      connect: (request?: ConnectRequest) => Promise<void>;
      disconnect: () => Promise<void>;
      isConnected: () => Promise<boolean>;
      getAddress: () => Promise<string>;
      getNetwork: () => Promise<string>;
      getBalance: () => Promise<string>;
      signTransaction: (
        transactionRequest: SignTransactionRequest,
      ) => Promise<SignTransactionResponse>;
      signVote: (voteRequest: SignVoteRequest) => Promise<SignVoteResponse>;
      signMessage: (options: {
        message: string;
        network: NetworkType;
      }) => Promise<{
        message: string;
        signatory: string;
        signature: string;
      }>;
      loaded: boolean;
      changeAddress: (
        request: ChangeAddressRequest,
      ) => Promise<ChangeAddressResponse>;
    };
  }
}

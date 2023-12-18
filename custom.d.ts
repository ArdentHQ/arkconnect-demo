import { SignTransactionRequest, SignTransactionResponse } from "@/app/lib";
import { SignVoteRequest, SignVoteResponse } from "@/app/lib/Network";

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
      signVote: (voteRequest: SignVoteRequest) => Promise<SignVoteResponse>;
      loaded: boolean;
    };
  }
}

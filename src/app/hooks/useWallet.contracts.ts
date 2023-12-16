import {
  SignTransactionRequest,
  SignTransactionResponse,
  WalletData,
} from "@/app/lib";

export interface UseWalletReturnType {
  isLoading: boolean;
  isConnecting: boolean;
  isErrored: boolean;
  isInstalled: boolean;
  isConnected: boolean;
  error?: string;
  wallet?: WalletData;
  connect: () => Promise<void>;
  disconnect: () => void;
  isTransacting: boolean;
  signTransaction: (
    transaction: SignTransactionRequest,
  ) => Promise<SignTransactionResponse>;
}

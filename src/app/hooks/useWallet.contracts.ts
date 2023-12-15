import {
  NetworkType,
  SignTransactionRequest,
  SignTransactionResponse,
} from "@/app/lib";

export interface WalletData {
  address: string;
  network: NetworkType;
  balance?: number | string;
}

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

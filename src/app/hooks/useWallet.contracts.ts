import { WalletData } from "@/app/lib/Wallet/contracts";

import {
  ArkConnectExtension,
  ChangeAddressRequest,
  ChangeAddressResponse,
  Coin,
  NetworkType,
  SignTransactionRequest,
  SignTransactionResponse,
  SignVoteRequest,
  SignVoteResponse,
} from "@/app/lib/Network";

export interface SignedMessage {
  message: string;
  signatory: string;
  signature: string;
}

export interface UseQueryData {
  extension: ArkConnectExtension | undefined;
  isConnected: boolean;
  wallet: {
    network?: NetworkType;
    address?: string;
    balance: number | undefined;
    coin?: Coin;
  };
}

export interface UseWalletReturnType {
  isLoading: boolean;
  isConnecting: boolean;
  isErrored: boolean;
  isInstalled?: boolean;
  isConnected: boolean;
  error?: string;
  wallet: WalletData;
  connect: () => Promise<void>;
  disconnect: () => void;
  isTransacting: boolean;
  signTransaction: (
    transaction: SignTransactionRequest,
  ) => Promise<SignTransactionResponse>;
  isVoting: boolean;
  signVote: (transaction: SignVoteRequest) => Promise<SignVoteResponse>;
  signMessage: () => Promise<void>;
  changeAddress: (
    request: ChangeAddressRequest,
  ) => Promise<ChangeAddressResponse>;
  setNetwork: (network: NetworkType) => void;
}

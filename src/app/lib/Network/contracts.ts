export enum NetworkType {
  DEVNET = "Devnet",
  MAINNET = "Mainnet",
}

export enum NetworkAddressLink {
  DEVNET = "https://test.arkscan.io/addresses/",
  MAINNET = "https://live.arkscan.io/addresses/",
}

export enum DelegatesLink {
  DEVNET = "https://ark-test.arkvault.io/api/delegates",
  MAINNET = "https://api.ark.io/api/delegates",
}

export enum NetworkTransactionsList {
  DEVNET = "https://ark-test.arkvault.io/api/transactions",
  MAINNET = "https://ark-live.arkvault.io/api/transactions",
}

export enum NetworkTransactionLink {
  DEVNET = "https://test.arkscan.io/transactions/",
  MAINNET = "https://live.arkscan.io/transactions/",
}

export enum WalletsLink {
  DEVNET = "https://ark-test.arkvault.io/api/wallets",
  MAINNET = "https://api.ark.io/api/wallets",
}

export enum Coin {
  ARK = "ARK",
  DARK = "DARK",
}

export interface SignTransactionRequest {
  amount: number;
  receiverAddress: string;
}

export interface SignTransactionResponse {
  id: string;
  sender: string;
  receiver: string;
  exchangeCurrency: string;
  amount: number;
  convertedAmount: number;
  fee: number;
  convertedFee: number;
  total: number;
  convertedTotal: number;
}

export interface SignVoteRequest {
  vote?: {
    amount: number;
    delegateAddress: string;
  };
  unvote?: {
    amount: number;
    delegateAddress: string;
  };
}

export interface SignVoteResponse {
  id: string;
  sender: string;
  voteDelegateAddress?: string;
  voteDelegateName?: string;
  votePublicKey?: string;
  unvoteDelegateAddress?: string;
  unvoteDelegateName?: string;
  unvotePublicKey?: string;
  exchangeCurrency: string;
  fee: number;
  convertedFee: number;
}

export interface AddressChangedEventData {
  data: {
    wallet: {
      address: string;
      coin: string;
      network: NetworkType;
    };
    type: ExtensionSupportedEvent;
  };
}

type ExtensionSupportedEvent = "addressChanged" | "disconnected" | "connected";

export interface ArkConnectExtension {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  isConnected: () => Promise<boolean>;
  on: (
    eventName: ExtensionSupportedEvent,
    callback: (data: AddressChangedEventData) => void,
  ) => void;
  getAddress: () => Promise<string>;
  getNetwork: () => Promise<string>;
  getBalance: () => Promise<string>;
  signTransaction: (
    transactionRequest: SignTransactionRequest,
  ) => Promise<SignTransactionResponse>;
  signVote: (voteRequest: SignVoteRequest) => Promise<SignVoteResponse>;
  signMessage: (options: { message: string }) => Promise<{
    message: string;
    signatory: string;
    signature: string;
  }>;
  loaded: boolean;
}

export enum NetworkType {
  DEVNET = "Devnet",
  MAINNET = "Mainnet",
}

export enum TransactionType {
  TRANSFER = "transfer",
  VOTE = "vote",
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
  fee: number;
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
    address: string;
  };
  unvote?: {
    amount: number;
    address: string;
  };
  fee: number;
}

export type Version = null | string;

export interface VoteTypeV1_9 {
  amount: number;
  address: string;
}

export interface VoteTypeV1_0 {
  amount: number;
  delegateAddress: string;
}
export interface SignVoteRequestVersioned<V extends Version = Version> {
  vote?: V extends "1.0.0" | "1.8.0" | null ? VoteTypeV1_0 : VoteTypeV1_9;
  unvote?: V extends "1.0.0" | "1.8.0" | null ? VoteTypeV1_0 : VoteTypeV1_9;
  fee: number;
}

export interface ResponseVoteTypeV1_9 {
  voteAddress?: string;
  votePublicKey?: string;
  unvoteAddress?: string;
  unvotePublicKey?: string;
}

export interface ResponseVoteTypeV1_0 {
  voteDelegateAddress?: string;
  voteDelegateName?: string;
  unvoteDelegateAddress?: string;
  unvoteDelegateName?: string;
}

export type SignVoteResponseVersioned<V extends Version = Version> = {
  id: string;
  sender: string;
  exchangeCurrency: string;
  fee: number;
  convertedFee: number;
} & (V extends "1.0.0" | "1.8.0" | null
  ? ResponseVoteTypeV1_0
  : ResponseVoteTypeV1_9);

export interface SignVoteResponse {
  id: string;
  sender: string;
  voteAddress?: string;
  voteName?: string;
  votePublicKey?: string;
  unvoteAddress?: string;
  unvoteName?: string;
  unvotePublicKey?: string;
  exchangeCurrency: string;
  fee: number;
  convertedFee: number;
}

export interface AddressChangedEventData {
  type: ExtensionSupportedEvent.AddressChanged;
  data: {
    wallet: {
      address: string;
      coin: string;
      network: NetworkType;
    };
  };
}

export interface LockToggledEventData {
  type: ExtensionSupportedEvent.AddressChanged;
  data: {
    isLocked: boolean;
  };
}

export enum ExtensionSupportedEvent {
  AddressChanged = "addressChanged",
  Disconnected = "disconnected",
  Connected = "connected",
  LockToggled = "lockToggled",
}

interface EventResponse {
  [ExtensionSupportedEvent.AddressChanged]: AddressChangedEventData;
  [ExtensionSupportedEvent.LockToggled]: LockToggledEventData;
  [ExtensionSupportedEvent.Connected]: never;
  [ExtensionSupportedEvent.Disconnected]: never;
}

export interface ArkConnectExtension {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  isConnected: () => Promise<boolean>;
  on: <T extends ExtensionSupportedEvent>(
    eventName: T,
    callback: (data: EventResponse[T]) => void,
  ) => void;
  getAddress: () => Promise<string>;
  getNetwork: () => Promise<string>;
  getBalance: () => Promise<string>;
  signTransaction: (
    transactionRequest: SignTransactionRequest,
  ) => Promise<SignTransactionResponse>;
  signVote: <V extends Version = Version>(
    voteRequest: SignVoteRequestVersioned<V>,
  ) => Promise<SignVoteResponseVersioned<V>>;
  signMessage: (options: { message: string }) => Promise<{
    message: string;
    signatory: string;
    signature: string;
  }>;
  version: () => string;
  loaded: boolean;
}

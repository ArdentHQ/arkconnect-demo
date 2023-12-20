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
  MAINNET = "https://live.arkscan.io/api/transactions/",
}

export enum WalletsLink {
  DEVNET = "https://ark-test.arkvault.io/api/wallets",
  MAINNET = "https://api.ark.io/api/wallets",
}

export enum Coin {
  ARK = "ARK",
  DARK = "DARK",
}

export interface ConnectRequest {
  network: "Devnet" | "Mainnet";
}
export interface SignTransactionRequest {
  amount: number;
  receiverAddress: string;
  network: "Devnet" | "Mainnet";
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
  network: NetworkType;
}

export interface SignVoteResponse {
  id: string;
  sender: string;
  delegate: string;
  exchangeCurrency: string;
  fee: number;
  convertedFee: number;
}
export interface ChangeAddressRequest {
  network?: NetworkType;
}
export interface ChangeAddressResponse {
  status: "success";
  domain: string;
  sessionId?: string;
  network?: NetworkType;
}

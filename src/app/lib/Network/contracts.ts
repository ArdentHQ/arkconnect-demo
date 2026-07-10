import { Address } from "viem";

export enum NetworkType {
  DEVNET = "Devnet",
  MAINNET = "Mainnet",
}

export enum TransactionType {
  TRANSFER = "transfer",
  VOTE = "vote",
}

export enum NetworkAddressLink {
  DEVNET = "https://mainsail-explorer.ihost.org//addresses/",
  MAINNET = "https://live.arkscan.io/addresses/",
}

export enum ValidatorsLink {
  DEVNET = "https://dwallets-evm.ihost.org/api/validators",
  MAINNET = "https://mainsailhq.com/api/validators",
}

export enum NetworkTransactionsList {
  DEVNET = "https://dwallets-evm.ihost.org/api/transactions",
  MAINNET = "https://mainsailhq.com/api/transactions",
}

export enum NetworkTransactionLink {
  DEVNET = "https://test.arkscan.io/transactions/",
  MAINNET = "https://live.arkscan.io/transactions/",
}

export enum WalletsLink {
  DEVNET = "https://dwallets-evm.ihost.org/api/wallets",
  MAINNET = "https://mainsailhq.com/api/wallets",
}

export enum Coin {
  ARK = "ARK",
  DARK = "DARK",
}

export interface SignTransactionRequest {
  value: string;
  gasPrice: string;
  gasLimit: string;
  to: Address;
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
  votes: string[];
  unvotes: string[];
  gasPrice: string;
  gasLimit: string;
}

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

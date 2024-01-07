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
  network: NetworkType;
}
export interface SignTransactionRequest {
  amount: number;
  receiverAddress: string;
  network: NetworkType;
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

export interface ArkConnectExtension {
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
  signMessage: (options: { message: string; network: NetworkType }) => Promise<{
    message: string;
    signatory: string;
    signature: string;
  }>;
  loaded: boolean;
  changeAddress: (
    request: ChangeAddressRequest,
  ) => Promise<ChangeAddressResponse>;
}

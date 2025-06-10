interface MultiPaymentItem {
  amount: string;
  recipientId: string;
}
// TODO: Confirm all types are included. Especially for votes and transfers
export interface TransactionData {
  confirmations: number;
  hash: string;
  blockHash: string;
  version: number;
  value: string;
  gas: string;
  gasPrice: string;
  from: string;
  senderPublicKey: string;
  to: string;
  signature: string;
  timestamp: string;
  nonce: string;
  data: string;
}

export interface TransactionsResponse {
  data: TransactionData[];
  meta: {
    count: number;
    first: string;
    last: string | null;
    next: string | null;
    pageCount: number;
    previous: string | null;
    self: string;
    totalCount: number;
    totalCountIsEstimate: boolean;
  };
}

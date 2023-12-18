interface MultiPaymentItem {
  amount: string;
  recipientId: string;
}
// TODO: Confirm all types are included. Especially for fotes and transfers
export interface TransactionData {
  id: string;
  blockId: string;
  version: number;
  type: number;
  typeGroup: number;
  amount: string;
  fee: string;
  sender: string;
  senderPublicKey: string;
  recipient: string;
  signature: string;
  confirmations: number;
  timestamp: {
    epoch: number;
    unix: number;
    human: string;
  };
  nonce: string;
  asset?: {
    payments: MultiPaymentItem[];
  };
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

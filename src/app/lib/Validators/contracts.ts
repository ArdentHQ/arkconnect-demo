export interface ValidatorResponseData {
  publicKey: string;
  address: string;
  balance: string;
  nonce: string;
  attributes: {
    vote: string;
    username?: string;
    validatorRank: number;
    validatorApproval: number;
    validatorResigned: boolean;
    validatorLastBlock: {
      hash: string;
      number: number;
      timestamp: number;
    };
    validatorPublicKey: string;
    validatorForgedFees: string;
    validatorForgedTotal: string;
    validatorVoteBalance: string;
    validatorVotersCount: number;
    validatorForgedRewards: string;
    validatorProducedBlocks: number;
  };
  updated_at: string;
}

export interface ValidatorData {
  publicKey: string;
  address: string;
  rank: number;
  username?: string;
}

export interface ValidatorItem extends Omit<ValidatorData, "rank"> {
  explorerUrl: string;
  isResigned?: boolean;
  rank?: number;
}

export interface SingleValidatorResponse {
  data: {
    address: string;
    isResigned: boolean;
    publicKey: string;
    username: string;
    votes: string;
  };
}
export interface ValidatorResponse {
  data: ValidatorResponseData[];
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

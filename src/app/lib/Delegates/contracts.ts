export interface DelegateData {
  publicKey: string;
  username: string;
  address: string;
  rank: number;
}

export interface DelegateItem extends Omit<DelegateData, "rank"> {
  explorerUrl: string;
  isResigned?: boolean;
  rank?: number;
}

export interface SingleDelegateResponse {
  data: {
    address: string;
    isResigned: boolean;
    publicKey: string;
    username: string;
    votes: string;
  };
}
export interface DelegateResponse {
  data: DelegateData[];
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

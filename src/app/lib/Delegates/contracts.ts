export interface DelegateData {
  publicKey: string;
  username: string;
  address: string;
  rank: number;
}

export interface DelegateItem extends DelegateData {
  explorerUrl: string;
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

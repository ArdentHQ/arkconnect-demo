export interface VoteData {
  asset: {
    votes: string[];
  };
}

export interface WalletVotesResponse {
  data: VoteData[];
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

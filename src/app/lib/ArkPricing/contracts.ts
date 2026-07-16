export interface PriceResponse {
  data: {
    coin: string;
    prices: Partial<
      Record<
        string,
        {
          price: number;
          change24h: number | null;
          timestamp: string;
        }
      >
    >;
  };
}

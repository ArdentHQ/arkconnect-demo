import { Coin } from "@/app/lib/Network";

export interface MarketDataResponseItem {
  name: Coin;
  current_price: number;
  id: string;
}

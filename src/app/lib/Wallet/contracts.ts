import { Coin, NetworkType } from "@/app/lib";

export interface WalletData {
  address: string;
  network: NetworkType;
  balance?: number | string;
  coin: Coin;
}

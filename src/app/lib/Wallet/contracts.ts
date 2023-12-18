import { Coin, NetworkType } from "@/app/lib/Network";

export interface WalletData {
  address: string;
  network: NetworkType;
  balance?: number | string;
  coin?: Coin;
}

import { Coin, NetworkType } from "@/app/lib/Network";

export interface WalletData {
  network: NetworkType;
  address: string | undefined;
  balance: number | undefined;
  coin?: Coin;
}

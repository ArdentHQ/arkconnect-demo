import { Coin, NetworkType } from "@/app/lib/Network";

export interface WalletData {
  address: string;
  network: NetworkType;
  balance?: number | string;
  coin?: Coin;
}

export type PartialWalletData = {
  [P in keyof WalletData]?: WalletData[P] | undefined;
};

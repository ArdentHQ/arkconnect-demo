import { Coin, NetworkType } from "@/app/lib/Network";

export interface WalletData {
  network: NetworkType;
  address?: string;
  balance: number | undefined;
  coin?: Coin;
}

export type PartialWalletData = {
  [P in keyof WalletData]?: WalletData[P] | undefined;
};

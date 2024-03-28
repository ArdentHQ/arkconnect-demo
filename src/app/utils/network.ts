import { NetworkType } from "@/app/lib/Network";

export const getNetworkCoin = (network: NetworkType) => {
  return network === NetworkType.DEVNET ? "DARK" : "ARK";
};

import { NetworkType, NetworkAddressLink } from "./network.contracts";

export function Network({ network }: { network: NetworkType }) {
  return {
    /**
     * Returns the explorer link of a given address.
     *
     * @param {string} address
     * @returns {string}
     */
    walletExplorerLink(address: string): string {
      if (network === NetworkType.DEVNET) {
        return [NetworkAddressLink.DEVNET, address].join("");
      }

      if (network === NetworkType.MAINNET) {
        return [NetworkAddressLink.MAINNET, address].join("");
      }

      throw new Error(`Network ${network} is not supported`);
    },
  };
}

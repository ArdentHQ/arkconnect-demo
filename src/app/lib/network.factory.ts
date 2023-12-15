import { NetworkType, NetworkAddressLink } from "./network.contracts";

/**
 * Implements Network interface.
 *
 * @param Object
 */
export function Network({ network }: { network?: NetworkType | string }) {
  return {
    /**
     * Returns the explorer link of a given address.
     *
     * @param {string} address
     * @returns {string}
     */
    walletExplorerLink(address: string): string {
      if (!this.isSupported()) {
        throw new Error(`Network ${network} is not supported`);
      }

      if (network === NetworkType.DEVNET) {
        return [NetworkAddressLink.DEVNET, address].join("");
      }

      return [NetworkAddressLink.MAINNET, address].join("");
    },
    /**
     * Check if network is supported.
     *
     * @returns {boolean}
     */
    isSupported(): boolean {
      return NetworkType.DEVNET === network || NetworkType.MAINNET === network;
    },
  };
}

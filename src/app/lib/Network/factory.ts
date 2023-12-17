import { NetworkType, NetworkAddressLink } from "./contracts";

export function Network({ network }: { network?: NetworkType | string }) {
  return {
    /**
     * Returns the explorer link of a given address.
     *
     * @param {string} address
     * @returns {string}
     */
    addressExplorerLink(address: string): string {
      if (!this.isSupported()) {
        throw new Error(`Network ${network} is not supported`);
      }

      if (network === NetworkType.DEVNET) {
        return [NetworkAddressLink.DEVNET, address].join("");
      }

      return [NetworkAddressLink.MAINNET, address].join("");
    },
    /**
     * Checkes whether the network is supported.
     *
     * @returns {boolean}
     */
    isSupported(): boolean {
      return NetworkType.DEVNET === network || NetworkType.MAINNET === network;
    },
    /**
     * Determines if the network is ARK devnet.
     *
     * @returns {{}
     */
    isTestnet(): boolean {
      return NetworkType.DEVNET === network;
    },
    /**
     * Determines if the network is ARK mainnet.
     *
     * @returns {{}
     */
    isMainnet(): boolean {
      return NetworkType.MAINNET === network;
    },
  };
}

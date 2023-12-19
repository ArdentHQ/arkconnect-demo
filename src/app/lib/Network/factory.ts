import {
  NetworkType,
  NetworkAddressLink,
  NetworkTransactionsList,
  NetworkTransactionLink,
  DelegatesLink,
  WalletsLink,
} from "./contracts";

// @TODO: cleanup url transformations.
export function Network({ network }: { network?: NetworkType | string }) {
  return {
    /**
     * Generates explorer links for an address.
     *
     * @param {string} address
     * @returns {string}
     */
    addressExplorerLink(address: string): string {
      if (!this.isSupported()) {
        throw new Error(`Network ${network} is not supported`);
      }

      const url = this.isTestnet()
        ? NetworkAddressLink.DEVNET
        : NetworkAddressLink.MAINNET;

      return [url, address].join("");
    },
    /**
     * Generates api transaction links for an address,
     * based on network type.
     *
     * @param {string} address
     * @param {number} limit
     * @returns {string}
     */
    addressTransactionLink(address: string, limit: number = 10): string {
      if (!this.isSupported()) {
        throw new Error(`Network ${network} is not supported`);
      }

      const url = new URL(
        this.isTestnet()
          ? NetworkTransactionsList.DEVNET
          : NetworkTransactionsList.MAINNET,
      );

      url.searchParams.append("address", address);
      url.searchParams.append("limit", limit.toString());

      return url.toString();
    },
    /**
     * Generates transaction link for a transaction,
     * based on network type.
     *
     * @returns {string}
     */
    transactionLink(transactionId: string): string {
      if (!this.isSupported()) {
        throw new Error(`Network ${network} is not supported`);
      }

      const url = new URL(
        this.isTestnet()
          ? NetworkTransactionLink.DEVNET
          : NetworkTransactionLink.MAINNET,
      );

      return [url.toString(), transactionId].join("");
    },
    delegatesLink() {
      if (!this.isSupported()) {
        throw new Error(`Network ${network} is not supported`);
      }

      const url = new URL(
        this.isTestnet() ? DelegatesLink.DEVNET : DelegatesLink.MAINNET,
      );

      url.searchParams.append("limit", "51");

      return url.toString();
    },
    walletVotesLink(address: string) {
      if (!this.isSupported()) {
        throw new Error(`Network ${network} is not supported`);
      }

      const url = this.isTestnet() ? WalletsLink.DEVNET : WalletsLink.MAINNET;

      return [url.toString(), address, "votes"].join("/");
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

import {
  NetworkType,
  NetworkAddressLink,
  NetworkTransactionsList,
  NetworkTransactionLink,
  ValidatorsLink,
  WalletsLink,
} from "./contracts";

// @TODO: cleanup url transformations.
export function Network({ network }: { network?: NetworkType | string }) {
  /**
   * Checkes whether the network is supported.
   *
   * @returns {boolean}
   */
  const isSupported = (): boolean =>
    NetworkType.DEVNET === network || NetworkType.MAINNET === network;

  /**
   * Determines if the network is ARK devnet.
   *
   * @returns {{}
   */
  const isTestnet = (): boolean => NetworkType.DEVNET === network;

  /**
   * Determines if the network is ARK mainnet.
   *
   * @returns {{}
   */
  const isMainnet = (): boolean => NetworkType.MAINNET === network;

  return {
    /**
     * Generates explorer links for an address.
     *
     * @param {string} address
     * @returns {string}
     */
    addressExplorerLink(address: string): string {
      if (!isSupported()) {
        throw new Error(`Network ${network} is not supported`);
      }

      const url = isTestnet()
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
      if (!isSupported()) {
        throw new Error(`Network ${network} is not supported`);
      }

      const url = new URL(
        isTestnet()
          ? NetworkTransactionsList.DEVNET
          : NetworkTransactionsList.MAINNET,
      );

      url.searchParams.append("address", address);
      url.searchParams.append("limit", limit.toString());

      return url.href;
    },
    /**
     * Generates transaction link for a transaction,
     * based on network type.
     *
     * @returns {string}
     */
    transactionLink(transactionId: string): string {
      if (!isSupported()) {
        throw new Error(`Network ${network} is not supported`);
      }

      const url = new URL(
        isTestnet()
          ? NetworkTransactionLink.DEVNET
          : NetworkTransactionLink.MAINNET,
      );

      return [url.href, transactionId].join("");
    },
    validatorsLink() {
      if (!isSupported()) {
        throw new Error(`Network ${network} is not supported`);
      }

      const url = new URL(
        isTestnet() ? ValidatorsLink.DEVNET : ValidatorsLink.MAINNET,
      );

      url.searchParams.append("limit", "53");

      return url.href;
    },

    votingValidatorLink(validatorPublicKey: string) {
      if (!isSupported()) {
        throw new Error(`Network ${network} is not supported`);
      }

      const url = new URL(
        isTestnet() ? ValidatorsLink.DEVNET : ValidatorsLink.MAINNET,
      );

      return [url.href, validatorPublicKey].join("/");
    },

    walletVotesLink(address: string) {
      if (!isSupported()) {
        throw new Error(`Network ${network} is not supported`);
      }

      const url = isTestnet() ? WalletsLink.DEVNET : WalletsLink.MAINNET;

      return [url, address, "votes"].join("/");
    },
    isSupported,
    isTestnet,
    isMainnet,
  };
}

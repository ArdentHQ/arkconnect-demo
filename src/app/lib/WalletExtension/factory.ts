import { isTruthy } from "@/app/utils/isTruthy";
import { ArkConnectExtension, Coin, NetworkType } from "@/app/lib/Network";
import { Currency } from "@/app/lib/Currency";

export interface WalletExtensionState {
  isInstalled: boolean;
  extension: ArkConnectExtension | undefined;
  isConnected: boolean;
  wallet: {
    network: NetworkType;
    address?: string;
    balance: number | undefined;
    coin?: Coin;
  };
}

export function WalletExtension() {
  const state = new Map();

  state.set("coin", undefined);
  state.set("address", undefined);
  state.set("balance", 0);
  state.set("network", undefined);
  state.set("isConnected", false);
  state.set("isLocked", false);

  return {
    /**
     * Determines whether the extension is installed.
     *
     * @returns {boolean}
     */
    isInstalled(): boolean {
      return isTruthy(this.extension());
    },
    /**
     * Returns arkconnect instance.
     *
     * @returns {ArkConnectExtension | undefined}
     */
    extension(): ArkConnectExtension | undefined {
      if (this.isBrowser()) {
        return window.arkconnect;
      }
    },
    /**
     * Determine whether the extension is connected.
     *
     * @returns {boolean}
     */
    isConnected(): boolean {
      return state.get("isConnected");
    },
    /**
     * Check whether the extension is locked.
     *
     * @returns {boolean}
     */
    isLocked(): boolean {
      return state.get("isLocked");
    },
    /**
     * Return the active coin of the extension.
     *
     * @returns {Coin}
     */
    coin(): Coin {
      return state.get("coin");
    },
    /**
     * Returns the active address of the extension.
     *
     * @returns {string | undefined}
     */
    address(): string | undefined {
      return state.get("address");
    },
    /**
     * Returns the active network of the extension
     *
     * @returns {boolean}
     */
    network(): NetworkType {
      return state.get("network");
    },
    /**
     * Returns the active network of the extension
     *
     * @returns {boolean}
     */
    balance(): ReturnType<typeof Currency> {
      return Currency({ value: state.get("balance"), coin: state.get("coin") });
    },
    /**
     * Sync extension status & data.
     *
     * @returns {Promise<void>}
     */
    async sync(): Promise<void> {
      await this.syncStatus();
      await this.syncWalletData();
    },
    /**
     * Fetch and update wallet extension data (balance, address, network)
     *
     * @returns {Promise<void>}
     */
    async syncWalletData(): Promise<void> {
      try {
        state.set("address", await window.arkconnect?.getAddress());
        state.set("network", await window.arkconnect?.getNetwork());
        state.set("balance", await window.arkconnect?.getBalance());
      } catch {
        state.set("address", undefined);
        state.set("balance", 0);
        //
      }
    },
    /**
     * Fetch & updated connection status from window.arkconnect.
     *
     * @returns {Promise<void>}
     */
    async syncStatus(): Promise<void> {
      try {
        const isConnected = (await window.arkconnect?.isConnected()) ?? false;
        state.set("isConnected", isConnected);
      } catch {
        state.set("isConnected", false);
        //
      }
    },
    /**
     * Connects to a given network.
     *
     * @param {NetworkType} network
     * @returns {Promise<void>}
     */
    async connect(network: NetworkType): Promise<void> {
      await this.extension()?.connect({ network });
    },
    /**
     * Determine whether it's a browser environment.
     *
     * @returns {boolean}
     */
    isBrowser(): boolean {
      return typeof window !== "undefined";
    },
    /**
     * Modify the state of the network and its corresponding coin.
     *
     * @param {NetworkType} network
     * @returns {void}
     */
    setNetwork(network?: NetworkType): void {
      state.set("network", network);

      if (state.get("network") === NetworkType.DEVNET) {
        state.set("coin", Coin.DARK);
      }

      if (state.get("network") === NetworkType.MAINNET) {
        state.set("coin", Coin.ARK);
      }
    },
    /**
     * Dumps state into json format.
     *
     * @returns {WalletExtensionState}
     */
    toJSON(): WalletExtensionState {
      return {
        isInstalled: this.isInstalled(),
        extension: this.extension(),
        isConnected: this.isConnected(),
        wallet: {
          network: this.network(),
          address: this.address(),
          balance: this.balance().toNumber(),
          coin: this.coin(),
        },
      };
    },
  };
}

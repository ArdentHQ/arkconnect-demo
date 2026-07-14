import { ArkConnect } from "@ardenthq/ark-connect-sdk";
import { Coin, NetworkType } from "@/app/lib/Network";
import { Currency } from "@/app/lib/Currency";

export interface WalletExtensionState {
  isInstalled: boolean;
  isConnected: boolean;
  wallet: {
    network: NetworkType;
    address?: string;
    balance: number | string | undefined;
    coin?: Coin;
  };
}

const client = new ArkConnect();

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
      return ArkConnect.isAvailable();
    },
    /**
     * Returns the shared SDK client.
     *
     * @returns {ArkConnect}
     */
    client(): ArkConnect {
      return client;
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
        state.set("address", await client.getAddress());
        state.set("network", await client.getNetwork());
        state.set("balance", await client.getBalance());
      } catch {
        state.set("address", undefined);
        state.set("balance", 0);
        //
      }
    },
    /**
     * Fetch & updated connection status from the extension.
     *
     * @returns {Promise<void>}
     */
    async syncStatus(): Promise<void> {
      try {
        state.set("isConnected", await client.isConnected());
      } catch {
        state.set("isConnected", false);
        //
      }
    },

    /**
     * Connects to a given network.
     *
     * @returns {Promise<void>}
     */
    async connect(): Promise<void> {
      await client.connect();
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

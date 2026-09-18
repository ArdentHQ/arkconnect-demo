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

type WalletExtensionStateValue =
  | string
  | number
  | boolean
  | Coin
  | NetworkType
  | undefined;

/**
 * Determines whether the extension is installed.
 *
 * @returns {boolean}
 */
const isInstalled = (): boolean => ArkConnect.isAvailable();

export function WalletExtension() {
  const state = new Map<string, WalletExtensionStateValue>([
    ["coin", undefined],
    ["address", undefined],
    ["balance", 0],
    ["network", undefined],
    ["isConnected", false],
    ["isLocked", false],
  ]);

  /**
   * Determine whether the extension is connected.
   *
   * @returns {boolean}
   */
  const isConnected = (): boolean => Boolean(state.get("isConnected"));

  /**
   * Check whether the extension is locked.
   *
   * @returns {boolean}
   */
  const isLocked = (): boolean => Boolean(state.get("isLocked"));

  /**
   * Return the active coin of the extension.
   *
   * @returns {Coin}
   */
  const coin = (): Coin => state.get("coin") as Coin;

  /**
   * Returns the active address of the extension.
   *
   * @returns {string | undefined}
   */
  const address = (): string | undefined => state.get("address") as string;

  /**
   * Returns the active network of the extension
   *
   * @returns {boolean}
   */
  const network = (): NetworkType => state.get("network") as NetworkType;

  /**
   * Returns the active network of the extension
   *
   * @returns {boolean}
   */
  const balance = (): ReturnType<typeof Currency> =>
    Currency({
      value: state.get("balance") as string | number,
      coin: state.get("coin") as Coin | undefined,
    });

  /**
   * Fetch and update wallet extension data (balance, address, network)
   *
   * @returns {Promise<void>}
   */
  const syncWalletData = async (): Promise<void> => {
    try {
      state.set("address", await client.getAddress());
      state.set("network", await client.getNetwork());
      state.set("balance", await client.getBalance());
    } catch {
      state.set("address", undefined);
      state.set("balance", 0);
      //
    }
  };

  /**
   * Fetch & updated connection status from the extension.
   *
   * @returns {Promise<void>}
   */
  const syncStatus = async (): Promise<void> => {
    try {
      state.set("isConnected", await client.isConnected());
    } catch {
      state.set("isConnected", false);
      //
    }
  };

  return {
    isInstalled,
    /**
     * Returns the shared SDK client.
     *
     * @returns {ArkConnect}
     */
    client(): ArkConnect {
      return client;
    },
    isConnected,
    isLocked,
    coin,
    address,
    network,
    balance,
    /**
     * Sync extension status & data.
     *
     * @returns {Promise<void>}
     */
    async sync(): Promise<void> {
      await syncStatus();
      await syncWalletData();
    },
    syncWalletData,
    syncStatus,
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
     * @param {NetworkType} networkType
     * @returns {void}
     */
    setNetwork(networkType?: NetworkType): void {
      state.set("network", networkType);

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
        isInstalled: isInstalled(),
        isConnected: isConnected(),
        wallet: {
          network: network(),
          address: address(),
          balance: balance().toNumber(),
          coin: coin(),
        },
      };
    },
  };
}

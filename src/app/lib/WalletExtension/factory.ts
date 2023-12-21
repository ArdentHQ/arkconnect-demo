import { isTruthy } from "@/app/utils/isTruthy";
import { Coin, NetworkType } from "../Network";
import { Currency } from "../Currency";

export function WalletExtension() {
  const state = new Map();

  state.set("coin", undefined);
  state.set("address", undefined);
  state.set("balance", 0);
  state.set("network", undefined);
  state.set("isConnected", false);
  state.set("isSyncingData", false);
  state.set("isSyncingStatus", false);
  state.set("isLocked", false);
  state.set("isConnecting", false);

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
     * @returns {any}
     */
    extension(): any {
      console.log({ isClient: this.isClient() });
      if (this.isClient()) {
        return window?.arkconnect;
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
     * Determine whether the extension is connected.
     *
     * @returns {boolean}
     */
    isConnecting(): boolean {
      return state.get("isConnecting");
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
     * @returns {boolean}
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
     * Fetch and update wallet extension data (balance, address, network)
     *
     * @returns {Promise<void>}
     */
    async syncWalletData(): Promise<void> {
      state.set("isSyncingData", true);

      try {
        state.set("address", await window.arkconnect?.getAddress());
        state.set("network", await window.arkconnect?.getNetwork());
        state.set("balance", await window.arkconnect?.getBalance());
      } catch {
        state.set("address", undefined);
        state.set("balance", 0);
        //
      }

      state.set("isSyncingData", false);
    },
    async syncStatus(): Promise<void> {
      state.set("isSyncingStatus", true);

      try {
        state.set("isConnected", await window.arkconnect?.isConnected());
      } catch (error) {
        state.set("isConnected", false);
        //
      }
      state.set("isSyncingStatus", false);
    },
    isSyncing() {
      return state.get("isSyncingStatus") || state.get("isSyncingData");
    },
    isClient(): boolean {
      return typeof window !== "undefined";
    },
    setNetwork(network?: NetworkType): void {
      state.set("network", network);

      if (state.get("network") === NetworkType.DEVNET) {
        state.set("coin", Coin.DARK);
      }

      if (state.get("network") === NetworkType.MAINNET) {
        state.set("coin", Coin.ARK);
      }
    },
    async connect(network: NetworkType) {
      state.set("isConnecting", true);
      try {
        // @ts-ignore
        await this.extension().connect({ network });
      } catch (_error) {
        const error = _error as Error;
        console.log("error");

        if (error) {
          state.set("isLocked", error.message.includes("is locked"));
          state.set("isConnecting", false);
          console.log({ error });
        }
      }
    },
  };
}

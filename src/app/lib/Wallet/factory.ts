import { WalletData } from "./contracts";
import { Coin, Network } from "@/app/lib/Network";
import { Currency } from "@/app/lib/Currency";
import { Coingecko } from "@/app/lib/Coingecko";

export function Wallet(wallet: WalletData) {
  const exchange = Coingecko();
  const network = Network(wallet);

  return {
    /**
     * Fetches and syncs the wallet's price data.
     *
     * @returns {Promise<void>}
     */
    async syncRates(): Promise<void> {
      await exchange.sync();
    },
    /**
     * Returns the wallet's address.
     *
     * @returns {string}
     */
    address(): string {
      return wallet.address;
    },
    /**
     * Returns the wallet's address.
     *
     * @returns {string}
     */
    coin(): Coin {
      if (this.network().isTestnet()) {
        return Coin.DARK;
      }

      return Coin.ARK;
    },
    /**
     * Returns Wallet network interface.
     *
     * @returns {ReturnType<typeof Network>}
     */
    network(): ReturnType<typeof Network> {
      return network;
    },
    /**
     * Returns wallet's balance interface.
     *
     * @returns {ReturnType<typeof Currency>}
     */
    balance(): ReturnType<typeof Currency> {
      return Currency({
        coin: this.coin(),
        value: exchange
          .price()
          .times(wallet.balance ?? 0)
          .toNumber(),
      });
    },
    /**
     * Returns wallet data fields as json object.
     *
     * @returns {WalletData}
     */
    toJSON(): WalletData {
      return wallet;
    },
  };
}

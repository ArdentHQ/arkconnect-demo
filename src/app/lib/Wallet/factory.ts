import { WalletData } from "./contracts";
import { Coingecko } from "@/app/lib/Coingecko";
import { Coin, Network } from "@/app/lib";
import { Currency } from "@/app/lib/Currency";

export function Wallet(wallet: WalletData) {
  const exchange = Coingecko();
  const network = Network(wallet);

  return {
    /**
     * Fetch and sync the wallet's price data.
     *
     * @returns {Promise<void>}
     */
    async sync(): Promise<void> {
      await exchange.sync();
    },
    /**
     * Return the wallet's address.
     *
     * @returns {string}
     */
    address(): string {
      return wallet.address;
    },
    /**
     * Return the wallet's address.
     *
     * @returns {string}
     */
    coin(): Coin {
      return wallet.coin;
    },
    /**
     * Return Wallet network interface.
     *
     * @returns {ReturnType<typeof Network>}
     */
    network(): ReturnType<typeof Network> {
      return network;
    },
    /**
     * Return wallet's balance interface.
     *
     * @returns {ReturnType<typeof Currency>}
     */
    balance(): ReturnType<typeof Currency> {
      return Currency({
        coin: wallet.coin,
        value: exchange
          .price()
          .times(wallet.balance ?? 0)
          .toNumber(),
      });
    },
  };
}

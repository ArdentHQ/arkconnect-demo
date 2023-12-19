import { WalletData } from "./contracts";
import { Coin, Network } from "@/app/lib/Network";
import { Currency } from "@/app/lib/Currency";
import { Coingecko } from "@/app/lib/Coingecko";
import { Transactions } from "@/app/lib/Transactions/factory";
import { WalletVotes } from "@/app/lib/Votes";
import { DelegateData, Delegates } from "@/app/lib/Delegates";

export function Wallet(wallet: WalletData) {
  const exchange = Coingecko();
  const network = Network(wallet);
  const votes = WalletVotes(wallet);
  const delegates = Delegates(wallet);

  const transactions = Transactions({
    network: wallet.network,
    address: wallet.address,
  });

  return {
    /**
     * Fetches the wallet's price data.
     *
     * @returns {Promise<void>}
     */
    async syncRates(): Promise<void> {
      await exchange.sync();
    },
    /**
     * Returns wallet's votes interface.
     *
     * @returns {ReturnType<typeof WalletVotes>}
     */
    votes(): ReturnType<typeof WalletVotes> {
      return votes;
    },
    /**
     * Returns wallet's delegates interface.
     *
     * @returns {ReturnType<typeof Delegates>}
     */
    delegates(): ReturnType<typeof Delegates> {
      return delegates;
    },
    /**
     * Returns wallet's transaction interface.
     *
     * @returns {ReturnType<typeof Transactions>}
     */
    transactions(): ReturnType<typeof Transactions> {
      return transactions;
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
    /**
     * Returns the current voting delegate.
     *
     * @returns {DelegateData | undefined}
     */
    votingDelegate(): DelegateData | undefined {
      if (votes.currentVotes().length === 0) {
        return undefined;
      }

      return delegates
        .items()
        .find((delegate) => votes.currentVotes().includes(delegate.publicKey));
    },
  };
}

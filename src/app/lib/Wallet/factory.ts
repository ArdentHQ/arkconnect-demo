import BigNumber from "bignumber.js";
import { WalletData } from "./contracts";
import { Coin, Network } from "@/app/lib/Network";
import { Currency } from "@/app/lib/Currency";
import { Transactions } from "@/app/lib/Transactions/factory";
import { WalletVotes } from "@/app/lib/Votes";
import {
  DelegateItem,
  Delegates,
  SingleDelegateResponse,
} from "@/app/lib/Delegates";

export function Wallet(wallet: WalletData) {
  const network = Network(wallet);
  const votes = WalletVotes(wallet);
  const delegates = Delegates(wallet);

  const transactions = Transactions({
    network: wallet.network,
    address: wallet.address,
  });

  let votingDelegate: DelegateItem | undefined;

  return {
    /**
     * Fetches the top 51 delegates.
     *
     * @returns {Promise<void>}
     */
    async syncVotingDelegate(): Promise<void> {
      const currentVotes = votes.currentVotes();

      const delegatePublicKey =
        currentVotes.length > 0 ? currentVotes[0] : undefined;

      if (delegatePublicKey === undefined) {
        return;
      }

      const response = await fetch(
        network.votingDelegateLink(delegatePublicKey),
      );

      if (!response.ok) {
        throw new Error(
          `[Wallet#syncVotingDelegate] Failed to retrieve votingDelegate. Error status: ${response.status}`,
        );
      }

      const { data } = (await response.json()) as SingleDelegateResponse;

      votingDelegate = {
        publicKey: data.publicKey,
        username: data.username,
        address: data.address,
        explorerUrl: network.addressExplorerLink(data.address),
        isResigned: data.isResigned,
      };
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
     * @returns {string | undefined}
     */
    address(): string | undefined {
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
    balance(rate: BigNumber): ReturnType<typeof Currency> {
      return Currency({
        coin: this.coin(),
        rate: this.network().isMainnet() ? rate.toString() : 0,
        value: wallet.balance?.toString() ?? 0,
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
    votingDelegate(): DelegateItem | undefined {
      return votingDelegate;
    },
  };
}

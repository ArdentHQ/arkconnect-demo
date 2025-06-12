import BigNumber from "bignumber.js";
import { WalletData } from "./contracts";
import { Coin, Network } from "@/app/lib/Network";
import { Currency } from "@/app/lib/Currency";
import { Transactions } from "@/app/lib/Transactions/factory";
import { WalletVotes } from "@/app/lib/Votes";
import {
  ValidatorItem,
  Validators,
  SingleValidatorResponse,
} from "@/app/lib/Validators";

export function Wallet(wallet: WalletData) {
  const network = Network(wallet);
  const votes = WalletVotes(wallet);
  const validators = Validators(wallet);

  const transactions = Transactions({
    network: wallet.network,
    address: wallet.address,
  });

  let votingValidator: ValidatorItem | undefined;

  return {
    /**
     * Fetches the actively forging validators
     *
     * @returns {Promise<void>}
     */
    async syncVotingValidator(): Promise<void> {
      const currentVotes = votes.currentVotes();

      const validatorPublicKey =
        currentVotes.length > 0 ? currentVotes[0] : undefined;

      if (validatorPublicKey === undefined) {
        return;
      }

      const response = await fetch(
        network.votingValidatorLink(validatorPublicKey),
      );

      if (!response.ok) {
        throw new Error(
          `[Wallet#syncVotingValidator] Failed to retrieve votingValidator. Error status: ${response.status}`,
        );
      }

      const { data } = (await response.json()) as SingleValidatorResponse;

      votingValidator = {
        publicKey: data.publicKey,
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
     * Returns wallet's validators interface.
     *
     * @returns {ReturnType<typeof Validators>}
     */
    validators(): ReturnType<typeof Validators> {
      return validators;
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
     * Returns the current voting validator.
     *
     * @returns {ValidatorData | undefined}
     */
    votingValidator(): ValidatorItem | undefined {
      return votingValidator;
    },
  };
}

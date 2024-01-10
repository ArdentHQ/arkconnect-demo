import BigNumber from "bignumber.js";
import { NetworkType, Network } from "@/app/lib/Network";
import { TransactionData } from "@/app/lib/Transactions/contracts";
import { DateTime } from "@/app/lib/DateTime";
import { Currency } from "@/app/lib/Currency";
import { isTruthy } from "@/app/utils/isTruthy";

export function Transaction({
  transaction,
  network: networkType,
  address,
}: {
  transaction: TransactionData;
  network?: NetworkType;
  address?: string;
}) {
  const network = Network({ network: networkType });

  return {
    /**
     * Returns the id of the transaction.
     *
     * @returns {string}
     */
    id(): string {
      return transaction.id;
    },
    /**
     * Returns the timestamp of the transaction.
     *
     * @returns {ReturnType<typeof DateTime>}
     */
    timestamp(): ReturnType<typeof DateTime> {
      return DateTime(transaction.timestamp.human);
    },
    /**
     * Returns the fee of the transaction.
     *
     * @returns {ReturnType<typeof Currency>}
     */
    fee(): ReturnType<typeof Currency> {
      return Currency({
        // TODO: fix hardcoded satoshi.
        value: BigNumber(transaction.fee).div(100_000_000).toString(),
      });
    },
    /**
     * Returns the amount of the transaction.
     *
     * @returns {ReturnType<typeof Currency>}
     */
    amount(): ReturnType<typeof Currency> {
      return Currency({
        // TODO: fix hardcoded satoshi.
        value: BigNumber(transaction.amount).div(100_000_000).toString(),
      });
    },
    /**
     * Returns the recipient address of the transaction.
     *
     * @returns {string}
     */
    recipient(): string {
      return transaction.recipient;
    },
    /**
     * Returns the sender of the transaction.
     *
     * @returns {string}
     */
    sender(): string {
      return transaction.sender;
    },
    /**
     * Determines whether the transaction is a sent transaction.
     *
     * @returns {boolean}
     */
    isReceived(): boolean {
      return this.recipient() === address;
    },
    /**
     * Determines whether the transaction is a sent transaction.
     *
     * @returns {boolean}
     */
    isSent(): boolean {
      return this.sender() === address;
    },
    /**
     * Returns the explorer link of the transaction.
     *
     * @returns {string}
     */
    explorerLink(): string {
      return network.transactionLink(transaction.id);
    },
    /**
     *
     * Determines whether the transaction a transfer.
     *
     * @returns {boolean}
     */
    isTransfer(): boolean {
      return transaction.type === 0;
    },
    /**
     *
     * Determines whether the transaction a vote.
     *
     * @returns {boolean}
     */
    isVote(): boolean {
      return transaction.type === 3;
    },
    /**
     *
     * Determines whether the transaction is a registration.
     *
     * @returns {boolean}
     */
    isContract(): boolean {
      return !this.isVote() && !this.isTransfer();
    },
    /**
     *
     * Determines whether the transaction is a multi payment.
     *
     * @returns {boolean}
     */
    isMultipay(): boolean {
      if (!this.isTransfer()) {
        return false;
      }

      if (!isTruthy(transaction.asset)) {
        return false;
      }

      // TODO: fix lookup.
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      return transaction.asset?.payments?.length > 1;
    },
    /**
     *
     * Determines whether the transaction is a return transaction.
     *
     * @returns {boolean}
     */
    isReturn(): boolean {
      if (!this.isMultipay()) {
        return this.recipient() === address;
      }

      if (!isTruthy(transaction.asset)) {
        return false;
      }
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      return transaction.asset?.payments.some(
        ({ recipientId }) => recipientId === address,
      );
    },
    /**
     * Returns the explorer link of the sender.
     *
     * @returns {string}
     */
    senderExplorerLink(): string {
      return network.addressExplorerLink(this.sender());
    },
    /**
     * Returns the explorer link of the recipient.
     *
     * @returns {string}
     */
    recipientExplorerLink(): string {
      return network.addressExplorerLink(this.recipient());
    },
    /**
     * Returns all transaction recipient addresses (multipay).
     *
     * @returns {string}
     */
    recipients(): string[] {
      return (
        transaction.asset?.payments.map(({ recipientId }) => recipientId) ?? []
      );
    },
  };
}

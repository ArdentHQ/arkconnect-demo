import { BigNumber } from "bignumber.js";
import {
  ConsensusAbi,
  UsernamesAbi,
  MultiPaymentAbi,
} from "@mainsail/evm-contracts";
import { decodeFunctionData as viemDecodeFunctionData, Hex } from "viem";
import { NetworkType, Network } from "@/app/lib/Network";
import { TransactionData } from "@/app/lib/Transactions/contracts";
import { DateTime } from "@/app/lib/DateTime";
import { Currency } from "@/app/lib/Currency";
import { CurrencyFormatter } from "@/app/utils/currencyFormatter";

export enum AbiType {
  "Consensus" = "consensus",
  "Username" = "username",
  "MultiPayment" = "multiPayment",
}

const decodeData = (data: Hex, abiType: AbiType = AbiType.Consensus) => {
  const abiMap: Record<AbiType, any> = {
    [AbiType.Consensus]: ConsensusAbi.abi,
    [AbiType.Username]: UsernamesAbi.abi,
    [AbiType.MultiPayment]: MultiPaymentAbi.abi,
  };

  return viemDecodeFunctionData({ data, abi: abiMap[abiType] });
};

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
    hash(): string {
      return transaction.hash;
    },
    /**
     * Returns the timestamp of the transaction.
     *
     * @returns {ReturnType<typeof DateTime>}
     */
    timestamp(): ReturnType<typeof DateTime> {
      return DateTime(+transaction.timestamp);
    },
    /**
     * Returns the fee of the transaction.
     *
     * @returns {ReturnType<typeof Currency>}
     */
    fee(): ReturnType<typeof Currency> {
      const fee = BigNumber(transaction.gas)
        .multipliedBy(transaction.gasPrice)
        .toString();

      return Currency({
        value: CurrencyFormatter.formatUnits(fee, "ark").toString(),
      });
    },
    /**
     * Returns the amount of the transaction.
     *
     * @returns {ReturnType<typeof Currency>}
     */
    amount(): ReturnType<typeof Currency> {
      return Currency({
        value: CurrencyFormatter.formatUnits(
          transaction.value,
          "ark",
        ).toString(),
      });
    },
    /**
     * Returns the recipient address of the transaction.
     *
     * @returns {string}
     */
    to(): string {
      return transaction.to;
    },
    /**
     * Returns the sender of the transaction.
     *
     * @returns {string}
     */
    from(): string {
      return transaction.from;
    },
    /**
     * Determines whether the transaction is a sent transaction.
     *
     * @returns {boolean}
     */
    isReceived(): boolean {
      return this.to() === address;
    },
    /**
     * Determines whether the transaction is a sent transaction.
     *
     * @returns {boolean}
     */
    isSent(): boolean {
      return this.from() === address;
    },
    /**
     * Returns the explorer link of the transaction.
     *
     * @returns {string}
     */
    explorerLink(): string {
      return network.transactionLink(transaction.hash);
    },
    /**
     *
     * Determines whether the transaction a transfer.
     *
     * @returns {boolean}
     */
    isTransfer(): boolean {
      return transaction.data === "";
    },
    /**
     *
     * Determines whether the transaction a vote.
     *
     * @returns {boolean}
     */
    isVote(): boolean {
      return transaction.data.includes("0x6dd7d8ea");
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
      return transaction.data.includes("0x084ce708");
    },
    /**
     *
     * Determines whether the transaction is a return transaction.
     *
     * @returns {boolean}
     */
    isReturn(): boolean {
      if (!this.isMultipay()) {
        return this.to() === address;
      }

      const decodedData = decodeData(
        transaction.data as Hex,
        AbiType.MultiPayment,
      );

      return !!address && (decodedData.args[0] as string[]).includes(address);
    },
    /**
     * Returns the explorer link of the sender.
     *
     * @returns {string}
     */
    senderExplorerLink(): string {
      return network.addressExplorerLink(this.from());
    },
    /**
     * Returns the explorer link of the recipient.
     *
     * @returns {string}
     */
    recipientExplorerLink(): string {
      return network.addressExplorerLink(this.to());
    },
    /**
     * Returns all transaction recipient addresses (multipay).
     *
     * @returns {string}
     */
    recipients(): string[] {
      const decodedData = decodeData(
        transaction.data as Hex,
        AbiType.MultiPayment,
      );

      return decodedData.args[0] as string[];
    },
  };
}

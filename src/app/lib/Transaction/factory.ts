import { BigNumber } from "bignumber.js";
import {
  AbiDecoder,
  ContractAbiType,
  TransactionTypeIdentifier,
  UnitConverter,
} from "@arkecosystem/typescript-crypto";
import { NetworkType, Network } from "@/app/lib/Network";
import { TransactionData } from "@/app/lib/Transactions/contracts";
import { DateTime } from "@/app/lib/DateTime";
import { Currency } from "@/app/lib/Currency";

const decodeMultipayment = (data: string) =>
  new AbiDecoder(ContractAbiType.MULTIPAYMENT).decodeFunctionData(data);

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
    hash(): string {
      return transaction.hash;
    },
    timestamp(): ReturnType<typeof DateTime> {
      return DateTime(+transaction.timestamp);
    },
    fee(): ReturnType<typeof Currency> {
      const gasUsed = transaction.receipt?.gasUsed ?? transaction.gas;
      const fee = BigNumber(gasUsed)
        .multipliedBy(transaction.gasPrice)
        .toString();

      return Currency({
        value: UnitConverter.formatUnits(fee, "ark").toString(),
      });
    },
    amount(): ReturnType<typeof Currency> {
      if (this.isMultipay()) {
        const decoded = decodeMultipayment(transaction.data);
        const addresses = decoded.args[0] as string[];
        const amounts = decoded.args[1] as bigint[];

        const total = amounts
          .reduce((sum, amount, index) => {
            if (
              this.isReceived() &&
              addresses[index].toLowerCase() !== address?.toLowerCase()
            ) {
              return sum;
            }
            return sum.plus(BigNumber(amount.toString()));
          }, BigNumber(0))
          .toString();

        return Currency({
          value: UnitConverter.formatUnits(total, "ark").toString(),
        });
      }

      return Currency({
        value: UnitConverter.formatUnits(transaction.value, "ark").toString(),
      });
    },
    to(): string {
      return transaction.to;
    },
    from(): string {
      return transaction.from;
    },
    isReceived(): boolean {
      if (this.isMultipay()) {
        return this.isReturn();
      }
      return this.to() === address;
    },
    isSent(): boolean {
      return this.from() === address;
    },
    explorerLink(): string {
      return network.transactionLink(transaction.hash);
    },
    isTransfer(): boolean {
      return TransactionTypeIdentifier.isTransfer(transaction.data);
    },
    isVote(): boolean {
      return TransactionTypeIdentifier.isVote(transaction.data);
    },
    isContract(): boolean {
      return !this.isVote() && !this.isTransfer() && !this.isMultipay();
    },
    isMultipay(): boolean {
      return TransactionTypeIdentifier.isMultiPayment(transaction.data);
    },
    isReturn(): boolean {
      if (!this.isMultipay()) {
        return this.to() === address;
      }

      const decoded = decodeMultipayment(transaction.data);
      const recipients = decoded.args[0] as string[];

      return (
        !!address &&
        recipients.some((r) => r.toLowerCase() === address.toLowerCase())
      );
    },
    senderExplorerLink(): string {
      return network.addressExplorerLink(this.from());
    },
    recipientExplorerLink(): string {
      return network.addressExplorerLink(this.to());
    },
    recipients(): string[] {
      const decoded = decodeMultipayment(transaction.data);
      return decoded.args[0] as string[];
    },
  };
}

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

  const hash = (): string => transaction.hash;

  const timestamp = (): ReturnType<typeof DateTime> =>
    DateTime(+transaction.timestamp);

  const fee = (): ReturnType<typeof Currency> => {
    const gasUsed = transaction.receipt?.gasUsed ?? transaction.gas;
    const feeAmount = BigNumber(gasUsed)
      .multipliedBy(transaction.gasPrice)
      .toString();

    return Currency({
      value: UnitConverter.formatUnits(feeAmount, "ark").toString(),
    });
  };

  const to = (): string => transaction.to;

  const from = (): string => transaction.from;

  const isTransfer = (): boolean =>
    TransactionTypeIdentifier.isTransfer(transaction.data);

  const isVote = (): boolean =>
    TransactionTypeIdentifier.isVote(transaction.data);

  const isMultipay = (): boolean =>
    TransactionTypeIdentifier.isMultiPayment(transaction.data);

  const isContract = (): boolean => !isVote() && !isTransfer() && !isMultipay();

  const isReturn = (): boolean => {
    if (!isMultipay()) {
      return to() === address;
    }

    const decoded = decodeMultipayment(transaction.data);
    const recipients = decoded.args[0] as string[];

    return (
      !!address &&
      recipients.some((r) => r.toLowerCase() === address.toLowerCase())
    );
  };

  const isReceived = (): boolean => {
    if (isMultipay()) {
      return isReturn();
    }
    return to() === address;
  };

  const isSent = (): boolean => from() === address;

  const amount = (): ReturnType<typeof Currency> => {
    if (isMultipay()) {
      const decoded = decodeMultipayment(transaction.data);
      const addresses = decoded.args[0] as string[];
      const amounts = decoded.args[1] as bigint[];

      const total = amounts
        .reduce((sum, amountValue, index) => {
          if (
            isReceived() &&
            addresses[index].toLowerCase() !== address?.toLowerCase()
          ) {
            return sum;
          }
          return sum.plus(BigNumber(amountValue.toString()));
        }, BigNumber(0))
        .toString();

      return Currency({
        value: UnitConverter.formatUnits(total, "ark").toString(),
      });
    }

    return Currency({
      value: UnitConverter.formatUnits(transaction.value, "ark").toString(),
    });
  };

  const explorerLink = (): string => network.transactionLink(transaction.hash);

  const senderExplorerLink = (): string => network.addressExplorerLink(from());

  const recipientExplorerLink = (): string => network.addressExplorerLink(to());

  const recipients = (): string[] => {
    const decoded = decodeMultipayment(transaction.data);
    return decoded.args[0] as string[];
  };

  return {
    hash,
    timestamp,
    fee,
    amount,
    to,
    from,
    isReceived,
    isSent,
    explorerLink,
    isTransfer,
    isVote,
    isContract,
    isMultipay,
    isReturn,
    senderExplorerLink,
    recipientExplorerLink,
    recipients,
  };
}

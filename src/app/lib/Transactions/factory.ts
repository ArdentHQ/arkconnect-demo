import { TransactionData, TransactionsResponse } from "./contracts";
import { NetworkType, Network } from "@/app/lib/Network";
import { isTruthy } from "@/app/utils/isTruthy";

export function Transactions({
  address,
  network: networkType,
}: {
  network?: NetworkType;
  address?: string;
}) {
  const network = Network({ network: networkType });
  const state = new Map<"transactions", TransactionData[]>();

  return {
    /**
     * Fetches transactions for an address.
     *
     * @param {number} limit
     * @returns {Promise<void>}
     */
    async sync(limit: number = 10): Promise<void> {
      if (!isTruthy(address)) {
        throw new Error("[Transactions#sync] Address is not provided.");
      }

      const url = network.addressTransactionLink(address, limit);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `[Transactions#sync] Failed to retrieve transactions for ${address}. Error status: ${response.status}`,
        );
      }

      const data = (await response.json()) as TransactionsResponse;
      state.set("transactions", data.data);
    },
    /**
     * Returns transaction items.
     *
     * @returns {TransactionData[]}
     */
    items(): TransactionData[] {
      return state.get("transactions") ?? [];
    },
  };
}

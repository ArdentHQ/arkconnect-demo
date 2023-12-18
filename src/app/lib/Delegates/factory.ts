import { Network, NetworkType } from "@/app/lib/Network";
import { DelegateData, DelegateItem, DelegateResponse } from "./contracts";

export function Delegates(properties: { network: NetworkType }) {
  const network = Network(properties);
  const state = new Map<"delegates", DelegateData[]>();

  return {
    /**
     * Fetches the top 51 delegates.
     *
     * @returns {Promise<void>}
     */
    async sync(): Promise<void> {
      const response = await fetch(network.delegatesLink());

      if (!response.ok) {
        throw new Error(
          `[Delegates#sync] Failed to retrieve delegates. Error status: ${response.status}`,
        );
      }

      const data = (await response.json()) as DelegateResponse;
      state.set("delegates", data.data);
    },
    /**
     * Returns delegate items.
     *
     * @returns {DelegateItem[]}
     */
    items(): DelegateItem[] {
      return (state.get("delegates") ?? []).map((delegate) => {
        return {
          ...delegate,
          explorerUrl: network.addressExplorerLink(delegate.address),
        };
      });
    },
  };
}

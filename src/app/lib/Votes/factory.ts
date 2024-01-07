import { WalletVotesResponse } from "./contracts";
import { NetworkType, Network } from "@/app/lib/Network";
import { isTruthy } from "@/app/utils/isTruthy";

export function WalletVotes({
  network: networkType,
  address,
}: {
  network?: NetworkType;
  address?: string;
}) {
  const network = Network({ network: networkType });
  const state = new Map<"currentVotes", string[]>();

  return {
    /**
     * Fetch the current vote  of a wallet.
     *
     * @returns {Promise<void>}
     */
    async sync(): Promise<void> {
      if (!isTruthy(address)) {
        throw new Error(
          "[Delegates#sync] Failed to retrieve delegates. Wallet address is missing.",
        );
      }

      const response = await fetch(network.walletVotesLink(address));

      if (!response.ok) {
        throw new Error(
          `[Delegates#sync] Failed to retrieve delegates. Error status: ${response.status}`,
        );
      }

      const data = (await response.json()) as WalletVotesResponse;
      const recentVotes = data.data[0]?.asset?.votes;

      if (isTruthy(recentVotes)) {
        const votes = recentVotes
          .filter((vote) => vote.startsWith("+"))
          .map((vote) => vote.slice(1));

        state.set("currentVotes", votes);
      }
    },
    /**
     * Returns the public keys of current wallets votes.
     *
     * @returns {string[]}
     */
    currentVotes(): string[] {
      return state.get("currentVotes") ?? [];
    },
  };
}

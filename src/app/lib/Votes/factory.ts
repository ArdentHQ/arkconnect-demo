import { NetworkType, WalletsLink } from "@/app/lib/Network";
import { isTruthy } from "@/app/utils/isTruthy";
import { AddressData } from "@/app/hooks/useAddressData";

export function WalletVotes({
  network: networkType,
  address,
}: {
  network?: NetworkType;
  address?: string;
}) {
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
          "[Validators#sync] Failed to retrieve wallet votes. Wallet address is missing.",
        );
      }

      const apiUrl =
        networkType === NetworkType.DEVNET
          ? WalletsLink.DEVNET
          : WalletsLink.MAINNET;

      const response = await fetch(`${apiUrl}/${address}`);

      if (!response.ok) {
        throw new Error(
          `[Validators#sync] Failed to retrieve address data. Error status: ${response.status}`,
        );
      }

      const data = (await response.json()) as { data: AddressData };
      const vote: string | undefined =
        data.data.vote || data.data.attributes.vote;

      state.set("currentVotes", vote ? [vote] : []);
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

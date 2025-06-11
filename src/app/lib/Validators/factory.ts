import { ValidatorData, ValidatorItem, ValidatorResponse } from "./contracts";
import { Network, NetworkType } from "@/app/lib/Network";

export function Validators(properties: { network: NetworkType }) {
  const network = Network(properties);
  const state = new Map<"validators", ValidatorData[]>();

  return {
    /**
     * Fetches the top 54 validators
     *
     * @returns {Promise<void>}
     */
    async sync(): Promise<void> {
      const response = await fetch(network.validatorsLink());

      if (!response.ok) {
        throw new Error(
          `[Validators#sync] Failed to retrieve validators. Error status: ${response.status}`,
        );
      }

      const data = (await response.json()) as ValidatorResponse;

      const validators: ValidatorData[] = data.data.map((validator) => {
        return {
          rank: validator.attributes.validatorRank,
          address: validator.address,
          publicKey: validator.publicKey,
        };
      });

      state.set("validators", validators);
    },
    /**
     * Returns validator items.
     *
     * @returns {ValidatorItem[]}
     */
    items(): ValidatorItem[] {
      return (state.get("validators") ?? []).map((validator) => {
        return {
          ...validator,
          explorerUrl: network.addressExplorerLink(validator.address),
        };
      });
    },
  };
}

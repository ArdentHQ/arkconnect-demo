import { QueryKey, useQuery } from "@tanstack/react-query";
import { NetworkType, WalletsLink } from "@/app/lib/Network";

interface AddressData {
  address: string;
  balance: string;
  nonce: string;
  publicKey: string | null;
  updated_at: string;
  attributes: Record<string, string>;
}

export const useAddressData = ({
  network,
}: {
  address?: string;
  network: NetworkType;
}) => {
  const address = "0xA9779c8FD842cE4fa7FaD6E4F49BA2a0935d99B2";
  const queryKey: QueryKey = ["address", address];

  const { data, error: _error } = useQuery({
    enabled: !!address,
    refetchOnMount: true,
    queryKey,
    staleTime: 0,
    refetchInterval: 3 * 60 * 1000, // 3 minutes
    queryFn: async () => {
      const apiUrl =
        network === NetworkType.DEVNET
          ? WalletsLink.DEVNET
          : WalletsLink.MAINNET;
      const jsonResponse = await fetch(`${apiUrl}/${address}`);
      return (await jsonResponse.json()) as { data: AddressData };
    },
  });

  return data?.data ?? undefined;
};

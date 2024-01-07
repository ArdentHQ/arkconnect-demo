import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";
import { isTruthy } from "@/app/utils/isTruthy";
import { WalletExtension } from "@/app/lib/WalletExtension";

interface WalletExtensionState {
  isInstalled: boolean;
  isLoaded: boolean;
  isLoading: boolean;
  extension: ReturnType<typeof WalletExtension>;
}

export const useWalletExtension = (): WalletExtensionState => {
  const queryClient = useQueryClient();

  const extension = WalletExtension();
  const queryKey: QueryKey = ["wallet-extension"];

  const { data } = useQuery({
    queryKey,
    staleTime: 0,
    initialData: {
      extension,
      isInstalled: false,
      isLoaded: false,
      isLoading: true,
    },
    queryFn: () => {
      const retriesCount =
        queryClient.getQueryState(queryKey)?.dataUpdateCount ?? 0;

      const isLoaded = retriesCount > 3;

      return {
        extension,
        isLoaded: isLoaded,
        isInstalled: isTruthy(window.arkconnect) && isLoaded,
        isLoading: !isLoaded,
      };
    },
    refetchInterval: () => {
      const retriesCount =
        queryClient.getQueryState(queryKey)?.dataUpdateCount ?? 0;

      return retriesCount > 4 ? false : 300;
    },
  });

  return data;
};

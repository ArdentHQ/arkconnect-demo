/* eslint-disable max-lines-per-function */
import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { UseQueryData, ArkConnectState } from "./useWallet.contracts";
import { useWalletExtension } from "./useWalletExtension";
import { isTruthy } from "@/app/utils/isTruthy";
import {
  NetworkType,
  SignTransactionRequest,
  SignTransactionResponse,
  SignVoteRequest,
  SignVoteResponse,
} from "@/app/lib/Network";

export const useArkConnect = (): ArkConnectState => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isErrored, setIsErrored] = useState(false);
  const [isTransacting, setIsTransacting] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState<string>();
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const { isLoaded, isLoading, extension } = useWalletExtension();

  const client = extension.client();

  const queryKey: QueryKey = ["wallet-connection"];
  const { data } = useQuery({
    enabled: isLoaded,
    refetchOnMount: true,
    queryKey,
    staleTime: 0,
    refetchInterval: 3 * 60 * 1000, // 3 minutes
    initialData: extension.toJSON(),
    queryFn: async () => {
      const data = queryClient.getQueryData(queryKey) as UseQueryData;

      extension.setNetwork(data.wallet.network || NetworkType.DEVNET);
      await extension.sync();

      return extension.toJSON();
    },
  });

  return {
    isLoading,
    isConnecting,
    isInstalled: data.isInstalled,
    isConnected: data.isConnected,
    wallet: data.wallet,
    error,
    isErrored,
    connect: async () => {
      if (extension.isConnected()) {
        return;
      }

      setIsErrored(false);
      setError(undefined);
      setIsConnecting(true);

      try {
        await extension.connect();
        setIsConnecting(false);
      } catch (_error) {
        setIsErrored(true);
        setIsConnecting(false);

        const error_ = _error as Error;
        setError(error_.message);
        return;
      }
    },
    disconnect: async () => {
      setIsErrored(false);
      setIsConnecting(false);

      if (!data.isConnected || !isTruthy(data)) {
        return;
      }

      await client.disconnect();
    },
    isTransacting,
    signTransaction: async (
      transaction: SignTransactionRequest,
    ): Promise<SignTransactionResponse> => {
      setIsTransacting(true);

      try {
        const response = await client.signTransaction(transaction);

        setIsTransacting(false);

        return response;
      } catch (error) {
        setIsTransacting(false);

        throw error;
      }
    },
    isVoting,
    signVote: async (request: SignVoteRequest): Promise<SignVoteResponse> => {
      setIsVoting(true);

      try {
        const response = await client.signVote(request);

        setIsVoting(false);

        return response;
      } catch (error) {
        setIsVoting(false);

        throw error;
      }
    },
    signMessage: async (): Promise<void> => {
      const response = await client.signMessage(t("SIGN_TEXT"));
      console.log({ response });
    },
    setNetwork: (network: NetworkType) => {
      queryClient.setQueryData(queryKey, (data: UseQueryData) => {
        return {
          ...data,
          wallet: {
            ...data.wallet,
            network,
          },
        };
      });
    },
  };
};

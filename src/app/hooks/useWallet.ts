import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import {
  SignedMessage,
  UseQueryData,
  UseWalletReturnType,
} from "./useWallet.contracts";
import { useWalletExtension } from "./useWalletExtension";
import { isTruthy } from "@/app/utils/isTruthy";
import {
  ChangeAddressRequest,
  ChangeAddressResponse,
  NetworkType,
  SignTransactionRequest,
  SignTransactionResponse,
  SignVoteRequest,
  SignVoteResponse,
} from "@/app/lib/Network";

class NoArkExtensionException extends Error {
  constructor() {
    super("arkconnect extension not found");
  }
}

export const useWallet = (): UseWalletReturnType => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isErrored, setIsErrored] = useState(false);
  const [isTransacting, setIsTransacting] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState<string>();
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const { isLoaded, isLoading, extension } = useWalletExtension();

  const queryKey: QueryKey = ["wallet-connection"];
  const { data, error: _error } = useQuery({
    enabled: isLoaded,
    refetchOnMount: true,
    queryKey,
    staleTime: 0,
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
        await extension.connect(data.wallet.network);
        setIsConnecting(false);
        window.location.reload();
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

      if (!data.isConnected || !isTruthy(data) || !isTruthy(data.extension)) {
        return;
      }

      await data.extension.disconnect();
      window.location.reload();
    },
    isTransacting,
    signTransaction: async (
      transaction: SignTransactionRequest,
    ): Promise<SignTransactionResponse> => {
      setIsTransacting(true);

      try {
        if (!window.arkconnect) {
          throw new NoArkExtensionException();
        }

        const response = (await window.arkconnect.signTransaction(
          transaction,
        )) as SignTransactionResponse | undefined;

        if (!isTruthy(response)) {
          throw new NoArkExtensionException();
        }

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
        if (!window.arkconnect) {
          throw new NoArkExtensionException();
        }

        const response = (await window.arkconnect.signVote(request)) as
          | SignVoteResponse
          | undefined;

        if (!isTruthy(response)) {
          throw new NoArkExtensionException();
        }

        setIsVoting(false);

        return response;
      } catch (error) {
        setIsVoting(false);

        throw error;
      }
    },
    changeAddress: async (
      request: ChangeAddressRequest,
    ): Promise<ChangeAddressResponse> => {
      if (!window.arkconnect) {
        throw new NoArkExtensionException();
      }

      return await window.arkconnect.changeAddress(request);
    },
    signMessage: async (): Promise<void> => {
      if (!window.arkconnect) {
        throw new NoArkExtensionException();
      }

      const response = (await window.arkconnect.signMessage({
        message: t("SIGN_TEXT"),
        network: data.wallet.network,
      })) as SignedMessage | undefined;
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

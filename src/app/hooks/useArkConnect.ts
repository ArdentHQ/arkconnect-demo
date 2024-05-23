/* eslint-disable max-lines-per-function */
import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import {
  SignedMessage,
  UseQueryData,
  ArkConnectState,
} from "./useWallet.contracts";
import { useWalletExtension } from "./useWalletExtension";
import { isTruthy } from "@/app/utils/isTruthy";
import {
  NetworkType,
  SignTransactionRequest,
  SignTransactionResponse,
  SignVoteRequest,
  SignVoteRequestVersioned,
  SignVoteResponse,
  SignVoteResponseVersioned,
  Version,
  VoteTypeV1_0,
  VoteTypeV1_9,
} from "@/app/lib/Network";

class NoArkExtensionException extends Error {
  constructor() {
    super("arkconnect extension not found");
  }
}

const getVersion = (): string | null => {
  if (!window.arkconnect) {
    // eslint-disable-next-line unicorn/no-null
    return null;
  }

  if (typeof window.arkconnect.version !== "function") {
    return "1.0.0";
  }

  return window.arkconnect.version();
};

const formatVoteRequest = <V extends Version = Version>(
  request: SignVoteRequest,
  version: V,
): SignVoteRequestVersioned<V> => {
  if (version === "1.0.0" || version === "1.8.0" || version === null) {
    return {
      ...request,
      vote:
        request.vote &&
        ({
          amount: request.vote.amount,
          delegateAddress: request.vote.address,
        } as V extends "1.0.0" | "1.8.0" | null ? VoteTypeV1_0 : VoteTypeV1_9),
      unvote:
        request.unvote &&
        ({
          amount: request.unvote.amount,
          delegateAddress: request.unvote.address,
        } as V extends "1.0.0" | "1.8.0" | null ? VoteTypeV1_0 : VoteTypeV1_9),
    };
  }
  return request as SignVoteRequestVersioned<V>;
};

const formatVoteResponse = <V extends Version = Version>(
  response: SignVoteResponseVersioned<V>,
  version: V,
): SignVoteResponse => {
  if (version === "1.0.0" || version === "1.8.0" || version === null) {
    const versionedResponse = response as SignVoteResponseVersioned<
      "1.0.0" | "1.8.0" | null
    >;
    return {
      ...response,
      voteAddress: versionedResponse.voteDelegateAddress,
      voteName: versionedResponse.voteDelegateName,
      unvoteAddress: versionedResponse.unvoteDelegateAddress,
      unvoteName: versionedResponse.unvoteDelegateName,
    };
  }
  return response as SignVoteResponse;
};

export const useArkConnect = (): ArkConnectState => {
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

      if (!data.isConnected || !isTruthy(data) || !isTruthy(data.extension)) {
        return;
      }

      await data.extension.disconnect();
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

        const version = getVersion();
        const formattedRequest = formatVoteRequest(request, version);
        const response = (await window.arkconnect.signVote(
          formattedRequest,
        )) as SignVoteResponseVersioned<typeof version> | undefined;

        if (!isTruthy(response)) {
          throw new NoArkExtensionException();
        }

        setIsVoting(false);

        return formatVoteResponse(response, version);
      } catch (error) {
        setIsVoting(false);

        throw error;
      }
    },
    signMessage: async (): Promise<void> => {
      if (!window.arkconnect) {
        throw new NoArkExtensionException();
      }

      const response = (await window.arkconnect.signMessage({
        message: t("SIGN_TEXT"),
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

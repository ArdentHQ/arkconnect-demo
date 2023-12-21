/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable max-lines-per-function */
// TODO: Cleanup
import {
  type QueryKey,
  useQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import {
  SignedMessage,
  UseQueryData,
  UseWalletReturnType,
} from "./useWallet.contracts";
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
import { Wallet } from "@/app/lib/Wallet";
import { WalletData } from "@/app/lib/Wallet/contracts";
import { WalletExtension } from "../lib/WalletExtension";

const isClient = () => typeof window !== "undefined";

class NoArkExtensionException extends Error {
  constructor() {
    super("arkconnect extension not found");
  }
}

export const useWallet = (): UseWalletReturnType => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isErrored, setIsErrored] = useState(false);
  const [isTransacting, setIsTransacting] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState<string>();
  const { t } = useTranslation();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setIsInstalled(isTruthy(window.arkconnect));
  });

  const queryClient = useQueryClient();

  const walletExtension = WalletExtension();
  walletExtension.setNetwork(NetworkType.DEVNET);

  const queryKey: QueryKey = ["wallet-connection"];

  const initialData = {
    isLoading: true,
    isInstalled: undefined,
    extension: walletExtension.isClient() ? window.arkconnect : undefined,
    isConnected: walletExtension.isConnected(),
    wallet: {
      network: walletExtension.network(),
      address: undefined,
      balance: walletExtension.balance().toNumber(),
      coin: undefined,
    },
  };

  const { data: walletData } = useQuery({
    queryKey,
    queryFn: async () => {
      const { wallet } = queryClient.getQueryData(queryKey) as UseQueryData;

      walletExtension.setNetwork(wallet.network);

      await walletExtension.syncStatus();
      await walletExtension.syncWalletData();

      return {
        isLoading: false,
        isInstalled,
        extension: walletExtension.extension(),
        isConnected: walletExtension.isConnected(),
        wallet: {
          address: walletExtension.address(),
          network: walletExtension.network(),
          balance: walletExtension.balance().toNumber(),
          coin: walletExtension.coin(),
        },
      };
    },
    refetchInterval: 2000,
  });

  const data = walletData ?? initialData;

  console.log({ isInstalled });

  return {
    isLoading: data.isLoading,
    isConnecting,
    isInstalled: data.isInstalled,
    isErrored,
    isConnected: data.isConnected,
    error,
    wallet: data.wallet,
    connect: async () => {
      if (!isTruthy(data) || !isTruthy(data.extension)) {
        // @TODO TBD
        return;
      }

      if (data.isConnected) {
        // @TODO TBD
        return;
      }

      setIsErrored(false);
      setError(undefined);
      setIsConnecting(true);

      try {
        // @ts-ignore
        await data.extension.connect({
          network: data.wallet?.network ?? NetworkType.DEVNET,
        });
        setIsConnecting(false);
      } catch (_error) {
        setIsErrored(true);
        setIsConnecting(false);

        const error_ = _error as Error;
        setError(error_.message);
        return;
      }
    },
    disconnect: () => {
      setIsErrored(false);
      setIsConnecting(false);

      if (!isTruthy(data) || !isTruthy(data.extension)) {
        // TODO Handle
        return;
      }

      if (!data.isConnected) {
        return;
      }

      data.extension.disconnect();
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

      if (!data.wallet?.network) {
        throw new Error("Wallet is not connected");
      }

      const response = (await window.arkconnect.signMessage({
        message: t("SIGN_TEXT"),
        network: data.wallet.network,
      })) as SignedMessage | undefined;
      console.log({ response });
    },
    setNetwork: (network: NetworkType) => {
      queryClient.setQueryData(queryKey, (data: UseQueryData) => {
        if (!data) {
          return data;
        }

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

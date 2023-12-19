/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable max-lines-per-function */
// TODO: Cleanup
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { SignedMessage, UseWalletReturnType } from "./useWallet.contracts";
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
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState<string>();
  const { t } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: ["wallet-connection"],
    queryFn: async () => {
      if (!isClient()) {
        return {};
      }

      const isInstalled = isTruthy(window.arkconnect);
      let isConnected: boolean | undefined = false;

      try {
        isConnected = await window.arkconnect?.isConnected();
      } catch (error) {
        console.log({ error });
        //
      }

      if (!isTruthy(isConnected)) {
        console.log("option 1");
        return {
          isInstalled,
          isConnected: false,
          extension: window.arkconnect,
          wallet: undefined,
        };
      }

      const address = await window.arkconnect?.getAddress();
      const network = await window.arkconnect?.getNetwork();
      const balance = await window.arkconnect?.getBalance();

      if (
        !isTruthy(address) ||
        (network !== NetworkType.DEVNET && network !== NetworkType.MAINNET)
      ) {
        console.log("option 2");
        return {
          isInstalled,
          isConnected: false,
          extension: window.arkconnect,
          wallet: undefined,
        };
      }

      return {
        isInstalled,
        isConnected,
        extension: window.arkconnect,
        wallet: Wallet({
          address,
          network,
          balance,
        }).toJSON(),
      };
    },
    refetchInterval: 500,
  });

  return {
    isLoading: isLoading || !isTruthy(data) || isConnecting,
    isConnecting,
    isErrored,
    isInstalled: isTruthy(data) ? data.isConnected : undefined,
    isConnected: isTruthy(data) ? data.isConnected : undefined,
    error,
    wallet: data?.wallet,
    connect: async () => {
      if (!isTruthy(data) || !isTruthy(data.extension)) {
        // TODO TBD
        return;
      }

      if (data.isConnected) {
        // TODO TBD
        return;
      }

      setIsErrored(false);
      setError(undefined);
      setIsConnecting(true);

      try {
        // @ts-ignore
        await data.extension.connect({ network: "Devnet" });
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

      if (!data?.wallet?.network) {
        throw new Error("Wallet is not connected");
      }

      const response = (await window.arkconnect.signMessage({
        message: t("SIGN_TEXT"),
        network: data.wallet.network,
      })) as SignedMessage | undefined;

      console.log({ response });
    },
  };
};

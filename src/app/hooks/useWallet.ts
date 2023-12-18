/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable max-lines-per-function */
// TODO: Cleanup
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { UseWalletReturnType } from "./useWallet.contracts";
import { isTruthy } from "@/app/utils/isTruthy";
import {
  NetworkType,
  SignTransactionRequest,
  SignTransactionResponse,
  SignVoteRequest,
  SignVoteResponse,
} from "@/app/lib/Network";
import { Wallet } from "@/app/lib/Wallet";

const isClient = () => typeof window !== "undefined";

export const useWallet = (): UseWalletReturnType => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isErrored, setIsErrored] = useState(false);
  const [isTransacting, setIsTransacting] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState<string>();

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
      } catch {
        //
      }

      if (!isTruthy(isConnected)) {
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
    isLoading: isLoading && !isConnecting,
    isConnecting,
    isErrored,
    isInstalled: isTruthy(data) && isTruthy(data.isInstalled),
    isConnected:
      !isLoading && isTruthy(data) ? isTruthy(data.isConnected) : false,
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
          throw new Error("arkconnect extension not found");
        }

        const response = (await window.arkconnect.signTransaction(
          transaction,
        )) as SignTransactionResponse | undefined;

        if (!isTruthy(response)) {
          throw new Error("arkconnect extension not found");
        }

        setIsTransacting(false);

        return response;
      } catch (error) {
        setIsTransacting(false);

        throw error;
      }
    },
    signVote: async (request: SignVoteRequest): Promise<SignVoteResponse> => {
      setIsVoting(true);

      try {
        if (!window.arkconnect) {
          throw new Error("arkconnect extension not found");
        }

        const response = (await window.arkconnect.signVote(request)) as
          | SignVoteResponse
          | undefined;

        if (!isTruthy(response)) {
          throw new Error("arkconnect extension not found");
        }

        setIsVoting(false);

        return response;
      } catch (error) {
        setIsVoting(false);

        throw error;
      }
    },
  };
};

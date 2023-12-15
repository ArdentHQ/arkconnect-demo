/* eslint-disable sonarjs/cognitive-complexity */
// TODO: Cleanup
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { isTruthy } from "@/app/utils/isTruthy";
import { UseWalletReturnType } from "./useWallet.contracts";
import { NetworkType } from "@/app/lib";

const isClient = () => typeof window !== "undefined";

export const useWallet = (): UseWalletReturnType => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isErrored, setIsErrored] = useState(false);
  const [error, setError] = useState<string>();

  const { data, isLoading } = useQuery({
    queryKey: ["wallet-connection"],
    queryFn: async () => {
      if (!isClient()) {
        return {};
      }

      const isInstalled = isTruthy(window.arkconnect);
      const isConnected = await window.arkconnect?.isConnected();

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
        wallet: {
          address,
          network,
          balance,
        },
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
        await data.extension.connect();
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
  };
};

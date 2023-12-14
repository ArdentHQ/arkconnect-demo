/* eslint-disable sonarjs/cognitive-complexity */
// TODO: Cleanup
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { isTruthy } from "@/app/utils/isTruthy";

const isClient = () => typeof window !== "undefined";

export const useWallet = () => {
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

      const address = isConnected
        ? await window.arkconnect?.getAddress()
        : undefined;

      const network = isConnected
        ? await window.arkconnect?.getNetwork()
        : undefined;

      const balance = isConnected
        ? await window.arkconnect?.getBalance()
        : undefined;

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

  console.log({ data });

  return {
    isLoading: isLoading && !isConnecting,
    isConnecting,
    isErrored,
    isInstalled: isTruthy(data) && data.isInstalled,
    isConnected: !isLoading && isTruthy(data) ? data.isConnected : false,
    error,
    wallet: data?.wallet ?? {
      address: undefined,
      network: undefined,
      balance: undefined,
    },
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

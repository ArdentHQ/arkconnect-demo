import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { isTruthy } from "../utils/isTruthy";

const isClient = () => typeof window !== "undefined";

export const useWallet = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isErrored, setIsErrored] = useState(false);
  const [error, setError] = useState();

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

  return {
    isLoading: isLoading && !isConnecting,
    isConnecting,
    isErrored,
    isInstalled: isTruthy(data) && data.isInstalled && !isLoading,
    isConnected: isTruthy(data) ? data.isConnected : false,
    error,
    wallet: data?.wallet,
    connect: async () => {
      if (!isTruthy(data) || !isTruthy(data.extension)) {
        // TODO Handle
        return;
      }

      if (data.isConnected) {
        // TODO: handle
        return;
      }

      setIsErrored(false);
      setError(undefined);
      setIsConnecting(true);

      try {
        await data.extension.connect();
      } catch (error) {
        setIsErrored(true);
        setIsConnecting(false);
        console.log(typeof error);
        setError(error.message);
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

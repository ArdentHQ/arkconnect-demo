import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const isClient = () => typeof window !== "undefined";

export const useWallet = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isErrored, setIsErrored] = useState(false);
  const [isInstalled] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useQuery({
    queryKey: ["wallet-connection"],
    queryFn: () => {
      if (!isClient()) {
        return;
      }

      console.log("Testing connection");
      console.log({ arkconnect: window.arkconnect });

      return { data: "test" };
    },
    refetchInterval: 5000,
  });

  return {
    isConnecting,
    isErrored,
    isInstalled,
    isConnected,
    address: "DArvWfH5nMDT38tWmo5k461vMQpRXHQWX9",
    connect: () => {
      setIsErrored(false);
      setIsConnecting(true);

      setTimeout(() => {
        setIsErrored(false);
        setIsConnecting(false);
        setIsConnected(true);
      }, 2000);
    },
    disconnect: () => {
      setIsConnected(false);
      setIsErrored(false);
      setIsConnecting(false);
    },
  };
};

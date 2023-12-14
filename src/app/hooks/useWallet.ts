import { useState } from "react";

export const useWallet = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isErrored, setIsErrored] = useState(false);
  const [isInstalled] = useState(true);
  const [isConnected, setIsConnected] = useState(true);

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
  };
};

import { useMemo } from "react";
import { useArkConnectContext } from "@/app/contexts/useArkConnectContext";
import { useMetaMaskContext } from "@/app/contexts/MetaMaskContext";

export const useActiveWallet = () => {
  const arkState = useArkConnectContext();

  const metaMaskState = useMetaMaskContext();

  const wallet = useMemo(() => {
    if (arkState.isConnected) {
      return arkState.wallet;
    }

    if (metaMaskState.connected) {
      return metaMaskState.wallet;
    }
  }, [arkState.isConnected, metaMaskState.connected]);

  return {
    wallet,
    isConnected: arkState.isConnected || metaMaskState.connected,
    error: arkState.error || metaMaskState.error,
    isLoading: arkState.isLoading,
    isConnecting: arkState.isConnecting || metaMaskState.connecting,
    isInstalled: arkState.isInstalled || !metaMaskState.needsMetaMask,
  };
};

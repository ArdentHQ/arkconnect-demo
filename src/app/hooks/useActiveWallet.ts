import { useMemo } from "react";
import { useArkConnectContext } from "@/app/contexts/useArkConnectContext";
import { useMetaMaskContext } from "@/app/contexts/MetaMaskContext";
import { SignTransactionRequest, SignVoteRequest } from "@/app/lib/Network";

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
  }, [
    arkState.isConnected,
    arkState.wallet,
    metaMaskState.connected,
    metaMaskState.wallet,
  ]);

  const connectedWith = useMemo(() => {
    if (arkState.isConnected) {
      return "ark";
    }

    if (metaMaskState.connected) {
      return "metaMask";
    }
  }, [arkState.isConnected, metaMaskState.connected]);

  return {
    wallet,
    activeExtension: connectedWith,
    isConnected: arkState.isConnected || metaMaskState.connected,
    error: arkState.error || metaMaskState.error,
    isLoading: arkState.isLoading,
    isConnecting: arkState.isConnecting || metaMaskState.isConnecting,
    isInstalled: arkState.isInstalled || !metaMaskState.isInstalled,
    disconnect: () => {
      if (!connectedWith) {
        return;
      }
      if (connectedWith === "ark") {
        arkState.disconnect();
      }

      metaMaskState.disconnect();
    },
    signTransaction: async (request: SignTransactionRequest) => {
      if (connectedWith === "ark") {
        return await arkState.signTransaction(request);
      }

      if (connectedWith === "metaMask") {
        return await metaMaskState.signTransaction(request);
      }
    },
    signVote: async (request: SignVoteRequest) => {
      if (connectedWith === "ark") {
        return await arkState.signVote(request);
      }

      if (connectedWith === "metaMask") {
        return await metaMaskState.signVote(request);
      }
    },
    signMessage: async () => {
      if (connectedWith === "ark") {
        return await arkState.signMessage();
      }

      if (connectedWith === "metaMask") {
        return await metaMaskState.signMessage();
      }
    },
  };
};

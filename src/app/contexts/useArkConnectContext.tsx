import { createContext, useContext, useEffect } from "react";
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { ArkConnect } from "@ardenthq/ark-connect-sdk";
import { useArkConnect } from "@/app/hooks";
import { ArkConnectState } from "@/app/hooks/useWallet.contracts";
import { NetworkType } from "@/app/lib/Network";

const ArkConnectContext = createContext<ArkConnectState | undefined>(undefined);

interface Properties {
  children: React.ReactNode;
}

const client = new ArkConnect();

const ArkConnectContextProvider = ({ children }: Properties): JSX.Element => {
  const arkConnectState = useArkConnect();

  const { isInstalled, setNetwork } = arkConnectState;

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isInstalled) {
      return;
    }

    const queryKey: QueryKey = ["wallet-connection"];

    const onAddressChanged = ({
      wallet,
    }: {
      wallet: { address: string; network: string };
    }): void => {
      setNetwork(wallet.network as NetworkType);
      queryClient.refetchQueries({ queryKey });
    };

    const refetch = (): void => {
      queryClient.refetchQueries({ queryKey });
    };

    client.on("addressChanged", onAddressChanged);
    client.on("disconnected", refetch);
    client.on("connected", refetch);
    client.on("lockToggled", refetch);

    return () => {
      client.off("addressChanged", onAddressChanged);
      client.off("disconnected", refetch);
      client.off("connected", refetch);
      client.off("lockToggled", refetch);
    };
  }, [isInstalled, queryClient, setNetwork]);

  return (
    <ArkConnectContext.Provider value={arkConnectState}>
      {children}
    </ArkConnectContext.Provider>
  );
};

export const useArkConnectContext = (): ArkConnectState => {
  const context = useContext(ArkConnectContext);

  if (context === undefined) {
    throw new Error(
      "useArkConnectContext must be within ArkConnectContext.Provider",
    );
  }

  return context;
};

export default ArkConnectContextProvider;

import {createContext, useContext, useEffect} from "react";
import {QueryKey, useQueryClient} from "@tanstack/react-query";
import {useArkConnect} from "@/app/hooks";
import {ArkConnectState} from "@/app/hooks/useWallet.contracts";
import {ExtensionSupportedEvent} from "@/app/lib/Network";

const ArkConnectContext = createContext<ArkConnectState | undefined>(undefined);

interface Properties {
  children: React.ReactNode;
}

const ArkConnectContextProvider = ({ children }: Properties): JSX.Element => {
  const arkConnectState = useArkConnect();

  const { setNetwork } = arkConnectState;

  const queryClient = useQueryClient();

  useEffect(() => {
    const queryKey: QueryKey = ["wallet-connection"];

    window.arkconnect?.on(ExtensionSupportedEvent.AddressChanged, (data) => {
      setNetwork(data.data.wallet.network);
      queryClient.refetchQueries({ queryKey });
    });

    window.arkconnect?.on(ExtensionSupportedEvent.Disconnected, () => {
      queryClient.refetchQueries({ queryKey });
    });

    window.arkconnect?.on(ExtensionSupportedEvent.Connected, () => {
      queryClient.refetchQueries({ queryKey });
    });

    window.arkconnect?.on(ExtensionSupportedEvent.LockToggled, (data) => {
      // here
      console.log(data)
      queryClient.refetchQueries({ queryKey });
    });
  }, [queryClient]);

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

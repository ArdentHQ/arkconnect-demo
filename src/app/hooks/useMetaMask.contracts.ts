import type { MetaMaskInpageProvider } from "@metamask/providers";
import { WalletExtensionState } from "@/app/lib/WalletExtension";

interface EthereumEvent {
  connect: {
    chainId: string;
  };
  chainChanged: string;
  accountsChanged: string[];
}

type EventKeys = keyof EthereumEvent;

type EventHandler<K extends EventKeys> = (event: EthereumEvent[K]) => void;

export type Ethereum = MetaMaskInpageProvider & {
  on: <K extends EventKeys>(event: K, eventHandler: EventHandler<K>) => void;
  request: (arguments_: {
    method: string;
    params?: unknown[];
  }) => Promise<unknown>;
};

export interface MetaMaskState {
  isConnecting: boolean;
  isInstalled: boolean;
  connected: boolean;
  initialized: boolean;
  supportsMetaMask: boolean;
  errorMessage?: string;
  error?: string;
  connectWallet: () => Promise<void>;
  wallet: WalletExtensionState["wallet"];
}

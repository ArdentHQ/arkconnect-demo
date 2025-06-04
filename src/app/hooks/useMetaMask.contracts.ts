import type { Eip1193Provider } from "ethers";
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

export type Ethereum = Eip1193Provider &
  MetaMaskInpageProvider & {
    on: <K extends EventKeys>(event: K, eventHandler: EventHandler<K>) => void;
  };

export interface MetaMaskState {
  connecting: boolean;
  connected: boolean;
  initialized: boolean;
  needsMetaMask: boolean;
  supportsMetaMask: boolean;
  errorMessage?: string;
  error?: string;
  connectWallet: () => Promise<void>;
  wallet: WalletExtensionState["wallet"];
}

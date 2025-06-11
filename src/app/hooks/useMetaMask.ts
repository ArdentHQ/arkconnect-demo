/* eslint-disable max-lines-per-function */
import { useCallback, useEffect, useState } from "react";
import { mainnet } from "viem/chains";
import {
  Address,
  createWalletClient,
  custom,
  defineChain,
  getAddress,
  parseEther,
  parseGwei,
} from "viem";
import { useTranslation } from "next-i18next";
import { Ethereum, MetaMaskState } from "@/app/hooks/useMetaMask.contracts";
import { Coin, NetworkType, SignTransactionRequest } from "@/app/lib/Network";
import { useAddressData } from "@/app/hooks/useAddressData";
import { WalletData } from "@/app/lib/Wallet/contracts";

const isBrowser = () => typeof window !== "undefined";

const hasMetaMask = (): boolean =>
  isBrowser() && window.ethereum?.isMetaMask === true;

const getEthereum = (): Ethereum | undefined => {
  if (isBrowser()) {
    return window.ethereum as Ethereum;
  }
};

// Metamask supports Chrome, Firefox, Brave, Edge, and Opera, since Edge and
// Opera are based on Chromium, we can just check for Chrome and Firefox
// @see https://metamask.io/download/
const isMetaMaskSupportedBrowser = (): boolean => {
  if (!isBrowser()) {
    return false;
  }

  // If the user has MetaMask installed, we can assume they are on a supported browser
  if (hasMetaMask()) {
    return true;
  }

  const isCompatible = /chrome|firefox/.test(navigator.userAgent.toLowerCase());
  const isMobile = /android|iphone|ipad|ipod/.test(
    navigator.userAgent.toLowerCase(),
  );

  return isCompatible && !isMobile;
};

const MAINSAIL_CHAIN_ID = 10_000;
const MAINSAIL_CHAIN_ID_HEX = "0x" + MAINSAIL_CHAIN_ID.toString(16);

const mainsailChainConfig = {
  chainId: MAINSAIL_CHAIN_ID_HEX,
  chainName: "Mainsail Testnet",
  nativeCurrency: {
    name: "ARK",
    symbol: "ARK",
    decimals: 18,
  },
  rpcUrls: ["https://dwallets-evm.ihost.org/evm/api"],
};

const mainsailChain = defineChain({
  id: MAINSAIL_CHAIN_ID,
  name: "Mainsail Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "ARK",
    symbol: "ARK",
  },
  rpcUrls: {
    default: {
      http: ["https://dwallets-evm.ihost.org/evm/api"],
    },
  },
});

const getChainId = async () => {
  const ethereum = getEthereum() as Ethereum;

  const chainIdAsHex = (await ethereum.request({
    method: "eth_chainId",
  })) as string;

  return Number.parseInt(chainIdAsHex, 16);
};

const requestAccounts = async () => {
  const ethereum = getEthereum() as Ethereum;

  const [account] = (await ethereum.request({
    method: "eth_requestAccounts",
  })) as Array<Address | undefined>;

  return account;
};

const isMainsailChain = (chainId: number) => {
  return chainId === MAINSAIL_CHAIN_ID;
};

export const useMetaMask = (): MetaMaskState => {
  const { t } = useTranslation();
  const [initialized, setInitialized] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [account, setAccount] = useState<Address | undefined>();
  const [error, setError] = useState<string>();
  const [requiresRefresh, setRequiresRefresh] = useState<boolean>(true);

  const supportsMetaMask = isMetaMaskSupportedBrowser();
  const needsMetaMask = !hasMetaMask() || !supportsMetaMask;

  const wallet: WalletData = {
    network: NetworkType.DEVNET,
    address: account,
    balance: undefined,
    coin: Coin.DARK,
  };

  const data = useAddressData({
    address: account,
    network: wallet.network,
  });
  wallet.balance = data?.balance;

  const onError = useCallback((errorMessage?: string) => {
    setError(errorMessage);
    setIsConnecting(false);
  }, []);

  const refreshAccount = (account_?: Address) => {
    const account = account_ ? getAddress(account_) : undefined;
    setAccount(account);
  };

  const getWalletClient = () => {
    return createWalletClient({
      account,
      chain: mainsailChain,
      transport: custom(getEthereum() as Ethereum),
    });
  };

  // Initialize the WalletClient when the page loads
  useEffect(() => {
    if (!supportsMetaMask || needsMetaMask || !requiresRefresh) {
      setInitialized(true);
      return;
    }

    setRequiresRefresh(false);
    setError(undefined);

    const ethereum = getEthereum() as Ethereum;

    const initWalletClient = async (): Promise<void> => {
      const chainId = await getChainId();

      if (!isMainsailChain(chainId)) {
        refreshAccount();
        return;
      }

      const [account] = (await ethereum.request({
        method: "eth_accounts",
      })) as [Address | undefined];

      refreshAccount(account);
      setInitialized(true);
    };

    void initWalletClient();
  }, [requiresRefresh]);

  useEffect(() => {
    if (!initialized || !supportsMetaMask || needsMetaMask) {
      return;
    }

    const ethereum = getEthereum() as Ethereum;

    const accountChangedListener = (_accounts: string[]): void => {
      setRequiresRefresh(true);
    };

    const chainChangedListener = (_chainId: string): void => {
      setRequiresRefresh(true);
    };

    const connectListener = ({ chainId }: { chainId: string }): void => {
      chainChangedListener(chainId);
    };

    const disconnectListener = (): void => {
      setRequiresRefresh(true);
    };

    ethereum.on("accountsChanged", accountChangedListener);

    ethereum.on("chainChanged", chainChangedListener);

    ethereum.on("disconnect", disconnectListener);

    // Connect event is fired when the user is disconnected because an error
    // (e.g. the network is invalid) and then switches to a valid network
    ethereum.on("connect", connectListener);

    return () => {
      ethereum.removeListener("accountsChanged", accountChangedListener);
      ethereum.removeListener("chainChanged", chainChangedListener);
      ethereum.removeListener("connect", connectListener);
      ethereum.removeListener("disconnect", disconnectListener);
    };
  }, [initialized]);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    setError(undefined);

    const chainId = await getChainId();

    let hasMainsailChain = isMainsailChain(chainId);

    if (!hasMainsailChain) {
      const ethereum = getEthereum() as Ethereum;

      try {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [mainsailChainConfig],
        });

        hasMainsailChain = true;
      } catch {
        // if error occurs check if the chain added already
        const chainId = await getChainId();
        hasMainsailChain = isMainsailChain(chainId);
      }
    }

    if (!hasMainsailChain) {
      onError(t("REJECTED_ADDING_CHAIN"));
      return;
    }

    try {
      const account = await requestAccounts();
      refreshAccount(account);
    } catch {
      onError(t("REJECTED_CONNECTION_REQUEST"));
      return;
    }

    setIsConnecting(false);
  }, [onError]);

  const disconnect = async () => {
    const ethereum = getEthereum() as Ethereum;

    await ethereum.request({
      method: "wallet_revokePermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });

    refreshAccount();
  };

  const signTransaction = async (request: SignTransactionRequest) => {
    const walletClient = getWalletClient();

    return await walletClient.sendTransaction({
      account: account as Address,
      to: request.to,
      value: parseEther(request.value),
      gas: BigInt(request.gasLimit),
      gasPrice: parseGwei(request.gasPrice),
    });
  };

  return {
    initialized,
    isInstalled: !needsMetaMask,
    supportsMetaMask,
    isConnecting,
    connected: !!account,
    error,
    connect,
    disconnect,
    signTransaction,
    wallet,
  };
};

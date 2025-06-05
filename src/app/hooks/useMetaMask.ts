/* eslint-disable max-lines-per-function */
import { useCallback, useEffect, useState } from "react";
import { mainnet } from "viem/chains";
import { Address, createWalletClient, custom, WalletClient } from "viem";
import { Ethereum, MetaMaskState } from "@/app/hooks/useMetaMask.contracts";
import { Coin, NetworkType } from "@/app/lib/Network";

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

export const useMetaMask = (): MetaMaskState => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [connecting, setConnecting] = useState<boolean>(false);
  const [chainId, setChainId] = useState<number | undefined>();
  const [account, setAccount] = useState<string | undefined>();
  const [walletClient, setWalletClient] = useState<WalletClient>();
  const [error, setError] = useState<string>();
  const [requiresSwitch, setRequiresSwitch] = useState<boolean>(false);

  const supportsMetaMask = isMetaMaskSupportedBrowser();
  const needsMetaMask = !hasMetaMask() || !supportsMetaMask;

  const onError = useCallback((errorMessage?: string) => {
    setError(errorMessage);
    setConnecting(false);
  }, []);

  // Initialize the Browser when the page loads
  useEffect(() => {
    if (!supportsMetaMask || needsMetaMask) {
      setInitialized(true);
      return;
    }

    const ethereum = getEthereum() as Ethereum;

    const initWalletClient = async (): Promise<void> => {
      const chainId = await getChainId();

      if (!isMainsailChain(chainId)) {
        return;
      }

      const [account] = (await ethereum.request({
        method: "eth_accounts",
      })) as [Address | undefined];

      const walletClient = refreshWalletClient(account);

      setAccount(account);

      setChainId(chainId);

      setWalletClient(walletClient);

      setInitialized(true);
    };

    void initWalletClient();
  }, []);

  useEffect(() => {
    if (requiresSwitch && initialized) {
      const handleSwitch = async () => {
        setRequiresSwitch(false);

      };

      void handleSwitch();
    }
  }, [requiresSwitch, account, chainId, initialized]);

  useEffect(() => {
    if (!initialized || !supportsMetaMask || needsMetaMask) {
      return;
    }

    const ethereum = getEthereum() as Ethereum;

    const accountChangedListener = (_accounts: string[]): void => {};

    const chainChangedListener = (_chainId: string): void => {
      console.log("chain triggered",);
      setRequiresSwitch(true);
    };

    const connectListener = ({ chainId }: { chainId: string }): void => {
      console.log("connect triggered",);
      chainChangedListener(chainId);
    };

    const disconnectListener = (): void => {
      console.log("disconnect triggered",);
      setChainId(undefined);
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

  const refreshWalletClient = (account: Address | undefined) => {
    const walletClient = createWalletClient({
      account,
      chain: mainnet,
      transport: custom(getEthereum() as Ethereum),
    });

    setWalletClient(walletClient);

    return walletClient;
  };

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

  const connectWallet = useCallback(async () => {
    setConnecting(true);
    setError(undefined);

    const chainId = await getChainId();

    // if (!isMainsailChain(chainId)) {
    //   onError("mainsail chain id needed");
    //   return;
    // }

    const account = await requestAccounts();

    if (account === undefined) {
      onError("account not found");
      return;
    }

    refreshWalletClient(account);

    setAccount(account);

    setChainId(chainId);

    setConnecting(false);
  }, [onError, requestChainAndAccount]);

  return {
    initialized,
    needsMetaMask,
    supportsMetaMask,
    connecting,
    connected: !!account && !!chainId,
    error,
    connectWallet,
    wallet: {
      network: NetworkType.DEVNET,
      address: account,
      balance: 0,
      coin: Coin.DARK,
    },
  };
};

/* eslint-disable max-lines-per-function */
import { useCallback, useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
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

const MAINSAIL_CHAIN_ID = "10000";

export const useMetaMask = (): MetaMaskState => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [connecting, setConnecting] = useState<boolean>(false);
  const [chainId, setChainId] = useState<string | undefined>();
  const [account, setAccount] = useState<string | undefined>();
  const [ethereumProvider, setEthereumProvider] = useState<BrowserProvider>();
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

    const initProvider = async (): Promise<void> => {
      const provider = new BrowserProvider(ethereum, "any");

      const [chain, accounts] = await Promise.all([
        provider.getNetwork(),
        provider.listAccounts(),
      ]);

      const account =
        accounts.length > 0 ? await accounts[0].getAddress() : undefined;
      const chainId = chain.chainId.toString();

      setAccount(account);

      setChainId(chainId);

      setEthereumProvider(provider);

      setInitialized(true);
    };

    void initProvider();
  }, []);

  useEffect(() => {
    if (requiresSwitch) {
      const handleSwitch = async () => {
        setRequiresSwitch(false);
        const { account, chainId } = await requestChainAndAccount();

        setAccount(account);

        if (account === undefined) {
          onError("account not found");
          return;
        }

        if (chainId !== MAINSAIL_CHAIN_ID) {
          onError("mainsail chain id needed");
          return;
        }

        setChainId(chainId);
      };

      void handleSwitch();
    }
  }, [requiresSwitch, account, chainId]);

  useEffect(() => {
    if (!initialized || !supportsMetaMask || needsMetaMask) {
      return;
    }

    const ethereum = getEthereum() as Ethereum;

    const accountChangedListener = (_accounts: string[]): void => {
      setRequiresSwitch(true);
    };

    const chainChangedListener = (_chainId: string): void => {
      setRequiresSwitch(true);
    };

    const connectListener = ({ chainId }: { chainId: string }): void => {
      chainChangedListener(chainId);
    };

    const disconnectListener = (): void => {
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

  const requestChainAndAccount = useCallback(async () => {
    try {
      if (ethereumProvider === undefined) {
        throw new Error("Missing ethereum provider");
      }

      // At this point we know for sure that the `ethereumProvider` is set
      const [accounts, chainIdAsHex] = (await Promise.all([
        ethereumProvider.send("eth_requestAccounts", []),
        ethereumProvider.send("eth_chainId", []),
      ])) as [string[], string];

      const chainId = Number.parseInt(chainIdAsHex, 16).toString();

      return {
        account: accounts.length > 0 ? accounts[0] : undefined,
        chainId,
      };
    } catch {
      return {
        account: undefined,
        chainId: undefined,
      };
    }
  }, [ethereumProvider]);

  const connectWallet = useCallback(async () => {
    setConnecting(true);
    setError(undefined);

    const { chainId, account } = await requestChainAndAccount();

    if (account === undefined) {
      onError("account not found");
      return;
    }

    if (chainId !== MAINSAIL_CHAIN_ID) {
      onError("mainsail chain id needed");
      return;
    }

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

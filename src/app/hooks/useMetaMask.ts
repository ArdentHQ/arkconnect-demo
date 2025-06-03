/* eslint-disable max-lines-per-function */
import { useCallback, useEffect, useState } from "react";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import { Ethereum, MetaMaskState } from "@/app/hooks/useMetaMask.contracts";

const hasMetaMask = (): boolean =>
  typeof window === "object" && window.ethereum?.isMetaMask === true;

const getEthereum = (): Ethereum | undefined => {
  if (hasMetaMask()) {
    return window.ethereum as Ethereum;
  }
};

// Metamask supports Chrome, Firefox, Brave, Edge, and Opera, since Edge and
// Opera are based on Chromium, we can just check for Chrome and Firefox
// @see https://metamask.io/download/
const isMetaMaskSupportedBrowser = (): boolean => {
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

export const useMetaMask = (): MetaMaskState => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [connecting, setConnecting] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(false);
  const [chainId, setChainId] = useState<bigint>();
  const [account, setAccount] = useState<JsonRpcSigner | undefined>();
  const [ethereumProvider, setEthereumProvider] = useState<BrowserProvider>();
  const [isErrored, setIsErrored] = useState(false);
  const [error, setError] = useState<string>();
  const [requiresSwitch, setRequiresSwitch] = useState<boolean>(false);

  const supportsMetaMask = isMetaMaskSupportedBrowser();
  const needsMetaMask = !hasMetaMask() || !supportsMetaMask;

  const onError = useCallback((errorMessage?: string) => {
    setError(errorMessage);
    setConnecting(false);
  }, []);

  console.log("useMetaMask", { account, initialized, chainId });
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

      const account = accounts.length > 0 ? accounts[0] : undefined;
      const chainId = chain.chainId;

      setAccount(account);

      setChainId(chainId);

      setEthereumProvider(provider);

      setInitialized(true);
    };

    void initProvider();
  }, []);

  useEffect(() => {
    if (!initialized || !supportsMetaMask || needsMetaMask) {
      return;
    }

    const ethereum = getEthereum() as Ethereum;

    const accountChangedListener = (accounts: string[]): void => {
      console.log("accountChangedListener", accounts);
      // setAccount(accounts.length > 0 ? accounts[0] : undefined);
      //
      // if (accounts.length === 0) {
      //   // log out
      // } else {
      //   setRequiresSwitch(true);
      // }
    };

    const chainChangedListener = (chainId: string): void => {
      // Chain ID came in as a hex string, so we need to convert it to decimal
      setChainId(BigInt(Number.parseInt(chainId, 16)));

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

      const chainId = BigInt(Number.parseInt(chainIdAsHex, 16));

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
    if (requiresSwitch) {
      return;
    }

    setConnecting(true);
    setError(undefined);

    const { chainId, account } = await requestChainAndAccount();

    if (account === undefined) {
      onError("No account found");
      return;
    }

    setConnected(true);

    setError(undefined);

    setConnecting(false);
  }, [requiresSwitch, requestChainAndAccount]);

  return {
    initialized,
    needsMetaMask,
    supportsMetaMask,
    connecting,
    connected,
    error,
    isErrored,
  };
};

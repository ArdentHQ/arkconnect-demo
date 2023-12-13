import { ConnectOverlay } from "./ConnectOverlay";
import { InstallOverlay } from "./InstallOverlay";
import { useWallet } from "@/app/hooks";

export const LoginOverlay = () => {
  const { isInstalled, isConnected } = useWallet();

  if (isConnected) {
    return <></>;
  }

  if (isInstalled) {
    return <ConnectOverlay />;
  }

  return <InstallOverlay />;
};

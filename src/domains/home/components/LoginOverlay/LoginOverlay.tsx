import { useWallet } from "@/app/hooks";
import { ConnectOverlay } from "./ConnectOverlay";
import { InstallOverlay } from "./InstallOverlay";

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

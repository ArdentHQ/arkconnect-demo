import { Spinner } from "@/app/components/Spinner";
import { ConnectOverlay } from "./ConnectOverlay";
import { InstallOverlay } from "./InstallOverlay";
import { useWallet } from "@/app/hooks";

export const LoginOverlay = () => {
  const { isInstalled, isConnected, wallet, isLoading } = useWallet();

  if (isLoading) {
    return (
      <div className="w-12 mx-auto flex items-center mt-20">
        <Spinner className="w-8" />
      </div>
    );
  }

  if (isConnected) {
    return (
      <div className="flex flex-col mx-auto text-center mt-20">
        <div>Address: {wallet.address}</div>
        <div>Network: {wallet.network}</div>
        <div>Balance: {wallet.balance}</div>
      </div>
    );
  }

  if (isInstalled) {
    return <ConnectOverlay />;
  }

  return <InstallOverlay />;
};

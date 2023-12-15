import { ConnectOverlay } from "./ConnectOverlay";
import { InstallOverlay } from "./InstallOverlay";
import { Button } from "@/app/components/Button";
import { Spinner } from "@/app/components/Spinner";
import { useWallet } from "@/app/hooks";

export const LoginOverlay = () => {
  const { isInstalled, isLoading, wallet, isConnected } = useWallet();

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

        <div>
          <Button>
            <span>Primary</span>
          </Button>

          <Button disabled>
            <span>Disabled</span>
          </Button>
          <Button busy>
            <span>Disabled</span>
          </Button>

          <Button variant="secondary">
            <span>Secondary</span>
          </Button>
          <Button variant="secondary" disabled>
            <span>Secondary Disabled</span>
          </Button>
          <Button variant="secondary" disabled busy>
            <span>Secondary Busy</span>
          </Button>
        </div>
      </div>
    );
  }

  if (isInstalled) {
    return <ConnectOverlay />;
  }

  return <InstallOverlay />;
};

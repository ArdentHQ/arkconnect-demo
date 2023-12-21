import { useEffect, useState } from "react";
import { ConnectOverlay } from "./ConnectOverlay";
import { InstallOverlay } from "./InstallOverlay";
import { Spinner } from "@/app/components/Spinner";
import { useWallet } from "@/app/hooks";

export const LoginOverlay = () => {
  const { isInstalled, isLoading } = useWallet();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(typeof window !== "undefined");
  }, []);

  if (!isClient) {
    return <></>;
  }

  if (isLoading) {
    return (
      <div className="w-12 mx-auto flex items-center mt-20">
        <Spinner className="w-8" />
      </div>
    );
  }

  if (isInstalled) {
    return <ConnectOverlay />;
  }

  return <InstallOverlay />;
};

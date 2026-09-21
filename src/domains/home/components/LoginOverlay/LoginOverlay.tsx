import { useEffect, useState } from "react";
import { ConnectOverlay } from "./ConnectOverlay";
import { Spinner } from "@/app/components/Spinner";
import { useArkConnectContext } from "@/app/contexts/useArkConnectContext";

export const LoginOverlay = () => {
  const { isLoading } = useArkConnectContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Effects only run client-side, so this deliberately defers rendering
    // until after mount to avoid a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
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

  return <ConnectOverlay />;
};

/* eslint-disable i18next/no-literal-string */
import { useState } from "react";
import { ConnectOverlay } from "./ConnectOverlay";
import { InstallOverlay } from "./InstallOverlay";
import { Button } from "@/app/components/Button";
import { Modal } from "@/app/components/Modal";
import { Spinner } from "@/app/components/Spinner";
import { useWallet } from "@/app/hooks";

export const LoginOverlay = () => {
  const { isInstalled, isConnected, wallet, isLoading } = useWallet();

  const [showModal, setShowModal] = useState(false);

  if (isLoading) {
    return (
      <div className="w-12 mx-auto flex items-center mt-20">
        <Spinner className="w-8" />
      </div>
    );
  }

  if (isConnected) {
    return (
      <>
        <div className="flex flex-col mx-auto text-center mt-20">
          <div>Address: {wallet.address}</div>
          <div>Network: {wallet.network}</div>
          <div>Balance: {wallet.balance}</div>

          <div className="mx-auto mt-20">
            <Button onClick={() => setShowModal(true)}>Send (Temporal)</Button>
          </div>
        </div>

        <Modal show={showModal} onClose={() => setShowModal(false)}>
          sfsafa
        </Modal>
      </>
    );
  }

  if (isInstalled) {
    return <ConnectOverlay />;
  }

  return <InstallOverlay />;
};

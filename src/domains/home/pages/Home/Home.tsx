import { useState } from "react";
import { Layout } from "@/app/components/Layout";
import { WalletOverview } from "@/app/components/WalletOverview";
import { useWallet } from "@/app/hooks";
import { isTruthy } from "@/app/utils/isTruthy";
import { LoginOverlay } from "@/domains/home/components/LoginOverlay";
import { Dialog } from "@/app/components/Dialog";
import { Button } from "@/app/components/Button";
export const Home = () => {
  const { wallet, isConnected } = useWallet();

  const [showModal, setShowModal] = useState(false);

  return (
    <Layout>
      <div className="container mx-auto px-6">
        {isConnected && isTruthy(wallet) && (
          <>
            <WalletOverview wallet={wallet} />

            <Dialog
              show={showModal}
              onClose={() => setShowModal(false)}
              onContinue={() => console.log("Continue")}
              continueDisabled={true}
              title="Send ARK"
            >
              Form Data
            </Dialog>

            <Button onClick={() => setShowModal(true)}>Send ARK</Button>
          </>
        )}
        {!isConnected && (
          <div className="sm:flex sm:items-center sm:h-full sm:w-full sm:mt-[8vw]">
            <LoginOverlay />
          </div>
        )}
      </div>
    </Layout>
  );
};

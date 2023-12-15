import { useState } from "react";
import { Layout } from "@/app/components/Layout";
import { WalletOverview } from "@/app/components/WalletOverview";
import { useWallet } from "@/app/hooks";
import { isTruthy } from "@/app/utils/isTruthy";
import { LoginOverlay } from "@/domains/home/components/LoginOverlay";
import { Button } from "@/app/components/Button";
import { SendForm } from "@/domains/global/components/SendForm";
export const Home = () => {
  const { wallet, isConnected } = useWallet();

  const [showModal, setShowModal] = useState(false);

  return (
    <Layout>
      <div className="container mx-auto px-6">
        {isConnected && isTruthy(wallet) && (
          <>
            <WalletOverview wallet={wallet} />

            <SendForm show={showModal} onClose={() => setShowModal(false)} />

            <Button onClick={() => setShowModal(true)}>
              {"Send ARK (Temporal)"}
            </Button>
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

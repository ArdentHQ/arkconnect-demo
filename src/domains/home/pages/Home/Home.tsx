import { useState } from "react";
import { Layout } from "@/app/components/Layout";
import { WalletOverview } from "@/app/components/WalletOverview";
import { useWallet } from "@/app/hooks";
import { isTruthy } from "@/app/utils/isTruthy";
import { LoginOverlay } from "@/domains/home/components/LoginOverlay";
import { SendModal } from "@/domains/transactions/components/SendModal";
import { Transactions } from "@/domains/transactions/components/Transactions";
import { Delegates } from "@/domains/vote/components/Delegates";

export const Home = () => {
  const { wallet, isConnected } = useWallet();
  const [showModal, setShowModal] = useState(false);

  return (
    <Layout>
      <div className="w-full sm:container mx-auto md:px-6">
        {isConnected && isTruthy(wallet) && (
          <>
            <WalletOverview
              walletData={wallet}
              onSend={() => {
                setShowModal(true);
              }}
            />

            <SendModal show={showModal} onClose={() => setShowModal(false)} />
          </>
        )}

        {!isConnected && (
          <div className="sm:flex sm:items-center sm:h-full sm:w-full sm:mt-[8vw]">
            <LoginOverlay />
          </div>
        )}

        {wallet && <Transactions walletData={wallet} />}

        {wallet && (
          <div className="bg-white w-[400px] mx-auto mt-6 p-4">
            <Delegates walletData={wallet} />
          </div>
        )}
      </div>
    </Layout>
  );
};

import { useState } from "react";
import { Layout } from "@/app/components/Layout";
import { WalletOverview } from "@/app/components/WalletOverview";
import { useWallet } from "@/app/hooks";
import { isTruthy } from "@/app/utils/isTruthy";
import { LoginOverlay } from "@/domains/home/components/LoginOverlay";
import { SendModal } from "@/domains/transactions/components/SendModal";
import { Transactions } from "@/domains/transactions/components/Transactions";
import { VoteModal } from "@/domains/transactions/components/Voting";
export const Home = () => {
  const { wallet, isConnected } = useWallet();
  const [showSendModal, setShowSendModal] = useState(false);
  const [showVoteModal, setShowVoteModal] = useState(false);

  return (
    <Layout>
      <div className="w-full sm:container mx-auto md:px-6">
        {isConnected && isTruthy(wallet) && (
          <>
            <WalletOverview
              walletData={wallet}
              onSend={() => {
                setShowSendModal(true);
              }}
              onVote={() => setShowVoteModal(true)}
            />

            <SendModal
              show={showSendModal}
              onClose={() => setShowSendModal(false)}
            />
            <VoteModal
              show={showVoteModal}
              onClose={() => setShowVoteModal(false)}
            />
          </>
        )}

        {!isConnected && (
          <div className="sm:flex sm:items-center sm:h-full sm:w-full sm:mt-[8vw]">
            <LoginOverlay />
          </div>
        )}

        {wallet && <Transactions walletData={wallet} />}
      </div>
    </Layout>
  );
};

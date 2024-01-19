import { useEffect, useState } from "react";
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { Layout } from "@/app/components/Layout";
import { WalletOverview } from "@/app/components/WalletOverview";
import { useWallet } from "@/app/hooks";
import { isTruthy } from "@/app/utils/isTruthy";
import { LoginOverlay } from "@/domains/home/components/LoginOverlay";
import { SendModal } from "@/domains/transactions/components/SendModal";
import { VoteModal } from "@/domains/vote/components/VoteModal";
import { Transactions } from "@/domains/transactions/components/Transactions";
import { Spinner } from "@/app/components/Spinner";

export const Home = () => {
  const { wallet, isConnected, isLoading, signMessage, setNetwork } =
    useWallet();
  const [showSendModal, setShowSendModal] = useState(false);
  const [showVoteModal, setShowVoteModal] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    const queryKey: QueryKey = ["wallet-connection"];

    window.arkconnect?.on("addressChanged", (data) => {
      setNetwork(data.data.wallet.network);
      queryClient.refetchQueries({ queryKey });
    });

    window.arkconnect?.on("disconnected", () => {
      console.log("Just disconnected");
      queryClient.refetchQueries({ queryKey });
    });
  }, [setNetwork, queryClient]);

  return (
    <Layout>
      <div className="w-full sm:container mx-auto md:px-6 flex-1 flex flex-col">
        {isLoading ? (
          <div className="flex items-center justify-center flex-1 h-full">
            <Spinner />
          </div>
        ) : (
          <>
            {isConnected && isTruthy(wallet) && isTruthy(wallet.address) && (
              <>
                <WalletOverview
                  walletData={wallet}
                  onSign={() => {
                    signMessage();
                  }}
                  onSend={() => {
                    setShowSendModal(true);
                  }}
                  onVote={() => {
                    setShowVoteModal(true);
                  }}
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

            {isConnected && <Transactions walletData={wallet} />}
          </>
        )}
      </div>
    </Layout>
  );
};

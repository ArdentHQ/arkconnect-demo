import { Layout } from "@/app/components/Layout";
import { WalletOverview } from "@/app/components/WalletOverview";
import { useWallet } from "@/app/hooks";
import { LoginOverlay } from "@/domains/home/components/LoginOverlay";

export const Home = () => {
  const { wallet, isConnected } = useWallet();

  return (
    <Layout>
      <div className="container mx-auto px-6">
        {isConnected && <WalletOverview wallet={wallet} />}
        {!isConnected && (
          <div className="sm:flex sm:items-center sm:h-full sm:w-full sm:mt-[8vw]">
            <LoginOverlay />
          </div>
        )}
      </div>
    </Layout>
  );
};

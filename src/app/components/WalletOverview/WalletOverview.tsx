import { WalletData } from "@/app/hooks/useWallet.contracts";
import { WalletAddress } from "./WalletAddress";

export const WalletOverview = ({ wallet }: { wallet: WalletData }) => {
  return (
    <div className="bg-white rounded-2.5xl mt-6 shadow-sm">
      <div className="flex items-center">
        <WalletAddress wallet={wallet} />
      </div>
    </div>
  );
};

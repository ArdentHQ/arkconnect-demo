import { WalletAddress } from "./WalletAddress";

export const WalletOverview = ({ wallet }: { wallet: any }) => {
  return (
    <div className="bg-white rounded-2.5xl mt-6 shadow-sm">
      <div className="flex items-center">
        <WalletAddress wallet={wallet} />
      </div>
    </div>
  );
};

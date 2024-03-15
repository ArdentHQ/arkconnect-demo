import { WalletAddress } from "./WalletAddress";
import { WalletBalance } from "./WalletBalance";
import { WalletOverviewProperties } from "./WalletOverview.contracts";

export const WalletOverview = (properties: WalletOverviewProperties) => (
  <div className="bg-white sm:rounded-2.5xl sm:mt-6 sm:shadow-sm dark:bg-subtle-black">
    <div className="flex flex-col lg:flex-row p-1">
      <WalletAddress {...properties} />
      <WalletBalance
        {...properties}
        className="rounded-[2px] sm:rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-[2px]"
      />
    </div>
  </div>
);

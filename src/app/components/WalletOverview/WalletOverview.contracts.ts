import { WalletData } from "@/app/lib";

export interface WalletOverviewProperties {
  className?: string;
  walletData: WalletData;
  onSend?: () => void;
  onVote?: () => void;
}

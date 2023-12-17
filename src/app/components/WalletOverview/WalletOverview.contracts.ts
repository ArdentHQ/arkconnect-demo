import { WalletData } from "@/app/lib/Wallet";

export interface WalletOverviewProperties {
  className?: string;
  walletData: WalletData;
  onSend?: () => void;
  onVote?: () => void;
}

import { WalletData } from "@/app/lib/Wallet/contracts";

export interface WalletOverviewProperties {
  className?: string;
  isSigning: boolean;
  walletData: WalletData;
  onSend?: () => void;
  onVote?: () => void;
  onSign?: () => void;
}

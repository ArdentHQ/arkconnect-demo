import { useQuery } from "@tanstack/react-query";
import { WalletData } from "@/app/lib/Wallet/contracts";
import { Delegates as DelegateService } from "@/app/lib/Delegates";
import { DelegatesList } from "../DelegatesList";

export const Delegates = ({ walletData }: { walletData: WalletData }) => {
  const { data: delegates } = useQuery({
    staleTime: 0,
    queryKey: ["delegates"],
    initialData: [],
    queryFn: async () => {
      const delegates = DelegateService({ network: walletData.network });
      await delegates.sync();
      return delegates.items();
    },
    refetchInterval: 20_000,
  });

  return <DelegatesList delegates={delegates} onChange={console.log} />;
};

import { Input } from "@/app/components/Input";
import { InputGroup } from "@/app/components/InputGroup/InputGroup";
import { Layout } from "@/app/components/Layout";
import { WalletOverview } from "@/app/components/WalletOverview";
import { useWallet } from "@/app/hooks";
import { isTruthy } from "@/app/utils/isTruthy";
import { LoginOverlay } from "@/domains/home/components/LoginOverlay";

export const Home = () => {
  const { wallet, isConnected } = useWallet();

  return (
    <Layout>
      <div className="container mx-auto px-6">
        <div className="flex flex-col space-y-2">
          <InputGroup label="Empty input" help="no value">
            <Input />
          </InputGroup>
          <Input value="Something" />
          <Input disabled />
          <Input disabled placeholder="disabled with placeholder" />
          <Input disabled value="disabled with value" />

          <h3 className="pt-4 font-bold">
            {"input with error trough the input group"}
          </h3>

          <InputGroup label="Empty input" help="no value" variant="error">
            <Input />
          </InputGroup>

          <h3 className="pt-4 font-bold">{"with error"}</h3>
          <Input variant="error" />
          <Input variant="error" value="Something" />
          <Input variant="error" disabled />
          <Input
            variant="error"
            disabled
            placeholder="disabled with placeholder"
          />
          <Input variant="error" disabled value="disabled with value" />
        </div>
        {isConnected && isTruthy(wallet) && <WalletOverview wallet={wallet} />}
        {!isConnected && (
          <div className="sm:flex sm:items-center sm:h-full sm:w-full sm:mt-[8vw]">
            <LoginOverlay />
          </div>
        )}
      </div>
    </Layout>
  );
};

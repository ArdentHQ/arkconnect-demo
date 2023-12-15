import { Input } from "@/app/components/Input";
import { InputGroup } from "@/app/components/InputGroup/InputGroup";
import { InputIcon } from "@/app/components/InputIcon";
import { Layout } from "@/app/components/Layout";
import { WalletOverview } from "@/app/components/WalletOverview";
import { useWallet } from "@/app/hooks";
import { isTruthy } from "@/app/utils/isTruthy";
import { LoginOverlay } from "@/domains/home/components/LoginOverlay";

import ExplorerIcon from "@/public/icons/explorer.svg";
export const Home = () => {
  const { wallet, isConnected } = useWallet();

  return (
    <Layout>
      <div className="container mx-auto px-6">
        <div className="space-y-2">
          <InputGroup label="input group with empty input" help="no value">
            <Input />
          </InputGroup>

          <h3 className="pt-4 font-bold">
            {"input with error trough the input group"}
          </h3>

          <InputGroup label="Empty input" help="no value" variant="error">
            <Input />
          </InputGroup>

          <h3 className="pt-4 font-bold">{"input with icons"}</h3>

          <InputIcon icon={ExplorerIcon}>
            <Input />
          </InputIcon>

          <br />
          <InputIcon icon={ExplorerIcon} position="right">
            <Input />
          </InputIcon>

          <h3 className="pt-4 font-bold">{"regular inputs"}</h3>
          <br />
          <Input value="Something" />
          <br />
          <Input disabled />
          <br />
          <Input disabled placeholder="disabled with placeholder" />
          <br />
          <Input disabled value="disabled with value" />
          <br />
          <h3 className="pt-4 font-bold">{"with error"}</h3>
          <Input variant="error" />
          <br />
          <Input variant="error" value="Something" />
          <br />
          <Input variant="error" disabled />
          <br />
          <Input
            variant="error"
            disabled
            placeholder="disabled with placeholder"
          />
          <br />
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

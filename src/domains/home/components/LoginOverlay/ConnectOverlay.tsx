import { useTranslation } from "next-i18next";
import Connect from "@/public/images/connect.svg";
import { H3 } from "@/app/components/Typography";
import { Button } from "@/app/components/Button";
import { Alert } from "@/app/components/Alert/Alert";
import { useWallet } from "@/app/hooks";
import { Spinner } from "@/app/components/Spinner";
import { isTruthy } from "@/app/utils/isTruthy";

export const ConnectOverlay = () => {
  const { t } = useTranslation();
  const { isConnecting, isErrored, connect, error } = useWallet();

  return (
    <div className="bg-white mx-auto w-full sm:w-96 overflow-hidden shadow-sm rounded-xl">
      <div className="text-center flex flex-col items-center p-8">
        <H3>{t("WELCOME")}</H3>

        <div>
          <p className="text-md mb-4 text-theme-gray-500">
            {t("CONNECT_ARK_CONNECT_TO_START")}
          </p>

          <div className="w-2/3 mx-auto">
            <Connect />
          </div>
        </div>

        <div className="h-12 mt-6 flex flex-col items-center justify-center">
          {!isConnecting && (
            <Button
              onClick={() => {
                void connect();
              }}
            >
              {isErrored && t("RETRY")}
              {!isErrored && t("CONNECT")}
            </Button>
          )}

          {isConnecting && (
            <div className="flex items-center space-x-3">
              <Spinner className="w-8" />
              <p className="text-lg font-medium leading-[1.406rem]">
                {t("CONNECTING")}
              </p>
            </div>
          )}
        </div>
      </div>

      {isConnecting && <Alert>{t("CLICK_TO_CONFIRM_WALLET_CONNECT")}</Alert>}

      {isErrored && (
        <Alert type="error">
          <div className="text-center">{t("WALLET_CONNECTION_ERROR")}</div>
          {isTruthy(error) && (
            <div className="mt-2 text-center">
              {t("ERROR_MESSAGE")} {error}
            </div>
          )}
        </Alert>
      )}
    </div>
  );
};

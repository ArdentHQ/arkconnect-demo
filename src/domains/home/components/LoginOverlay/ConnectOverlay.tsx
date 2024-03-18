import { useTranslation } from "next-i18next";
import ConnectLight from "@/public/images/connect-light.svg";
import ConnectDark from "@/public/images/connect-dark.svg";
import { H3 } from "@/app/components/Typography";
import { Button } from "@/app/components/Button";
import { Alert } from "@/app/components/Alert/Alert";
import { Spinner } from "@/app/components/Spinner";
import { isTruthy } from "@/app/utils/isTruthy";
import { useArkConnectContext } from "@/app/contexts/useArkConnectContext";
import { useDarkMode } from "@/app/contexts/useDarkModeContext";

export const ConnectOverlay = () => {
  const { t } = useTranslation();
  const { darkMode } = useDarkMode();
  const { isConnecting, isErrored, connect, error } = useArkConnectContext();

  return (
    <div className="bg-white mx-auto w-full sm:w-96 overflow-hidden shadow-sm rounded-xl dark:bg-subtle-black">
      <div className="text-center flex flex-col items-center p-8 dark:text-white">
        <H3>{t("WELCOME")}</H3>

        <div>
          <p className="text-md mb-4 text-theme-gray-500 dark:text-theme-gray-300">
            {t("CONNECT_ARK_CONNECT_TO_START")}
          </p>

          <div className="w-2/3 mx-auto">
            {darkMode ? <ConnectDark /> : <ConnectLight />}
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

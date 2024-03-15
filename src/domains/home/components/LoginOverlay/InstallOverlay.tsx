import { useTranslation } from "next-i18next";
import InstallLight from "@/public/images/install-light.svg";
import InstallDark from "@/public/images/install-dark.svg";
import { H3 } from "@/app/components/Typography";
import { LinkButton } from "@/app/components/Button";
import WalletLogo from "@/public/icons/logo.svg";
import { useDarkMode } from "@/app/contexts/useDarkModeContext";

export const InstallOverlay = () => {
  const { t } = useTranslation();
  const { darkMode } = useDarkMode();

  const isFirefox = navigator.userAgent.includes("Firefox");
  const isChrome = navigator.userAgent.includes("Chrome");

  return (
    <div className="bg-white mx-auto w-full sm:w-96 overflow-hidden shadow-sm rounded-xl dark:bg-subtle-black">
      <div className="p-8">
        <div className="text-center flex flex-col items-center dark:text-white">
          <H3>{t("WELCOME")}</H3>

          <div className="mb-6">
            <p className="text-md mb-4 text-theme-gray-500 dark:text-theme-gray-300">
              {t("INSTALL_ARK_CONNECT_TO_START")}
            </p>

            <div className="w-2/3 mx-auto">
              {darkMode ? <InstallDark /> : <InstallLight />}
            </div>
          </div>

          {isChrome && (
            <LinkButton href={process.env.ARK_CHROME_EXTENSION_URL} isExternal>
              <WalletLogo className="w-4 text-white" />
              <span>{t("INSTALL_WALLET")}</span>
            </LinkButton>
          )}

          {isFirefox && (
            <LinkButton href={process.env.ARK_FIREFOX_EXTENSION_URL} isExternal>
              <WalletLogo className="w-4 text-white" />
              <span>{t("INSTALL_WALLET")}</span>
            </LinkButton>
          )}
        </div>
      </div>
    </div>
  );
};

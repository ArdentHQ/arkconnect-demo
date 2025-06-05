import { useTranslation } from "next-i18next";
import cn from "classnames";
import { ComponentType, useMemo } from "react";
import ConnectArkLight from "@/public/images/connect-ark-light.svg";
import ConnectArkDark from "@/public/images/connect-ark-dark.svg";
import { H3 } from "@/app/components/Typography";
import { Button, LinkButton } from "@/app/components/Button";
import { Alert } from "@/app/components/Alert/Alert";
import { Spinner } from "@/app/components/Spinner";
import { isTruthy } from "@/app/utils/isTruthy";
import { useArkConnectContext } from "@/app/contexts/useArkConnectContext";
import { useDarkMode } from "@/app/contexts/useDarkModeContext";
import { useMetaMaskContext } from "@/app/contexts/MetaMaskContext";
import ArkConnectLogo from "@/public/icons/logo.svg";
import MetaMaskLogo from "@/public/icons/metamask-logo.svg";
import ConnectArkMetamaskLight from "@/public/images/connect-ark-metamask-light.svg";
import ConnectArkMetamaskDark from "@/public/images/connect-ark-metamask-dark.svg";
import ConnectMetamaskLight from "@/public/images/connect-metamask-light.svg";
import ConnectMetamaskDark from "@/public/images/connect-metamask-dark.svg";
import { useExtensionUrls } from "@/app/hooks/useExtensionUrls";
import InstallDark from "@/public/images/install-dark.svg";
import InstallLight from "@/public/images/install-light.svg";

enum InstallationStatus {
  BOTH,
  NONE,
  ARK_CONNECT,
  METAMASK,
}

export const ConnectOverlay = () => {
  const { t } = useTranslation();
  const { darkMode } = useDarkMode();
  const {
    isInstalled: arkInstalled,
    isConnecting: arkConnecting,
    connect,
    error: arkError,
  } = useArkConnectContext();
  const {
    isInstalled: metaMaskInstalled,
    isConnecting: metaMaskConnecting,
    connectWallet: connectMetaMask,
    error: metaMaskError,
  } = useMetaMaskContext();

  const { arkExtensionUrl, metaMaskExtensionUrl } = useExtensionUrls();

  const connecting = arkConnecting || metaMaskConnecting;
  const error = arkError || metaMaskError;

  const installationStatus = useMemo(() => {
    if (arkInstalled && metaMaskInstalled) {
      return InstallationStatus.BOTH;
    }

    if (arkInstalled) {
      return InstallationStatus.ARK_CONNECT;
    }

    if (metaMaskInstalled) {
      return InstallationStatus.METAMASK;
    }

    return InstallationStatus.NONE;
  }, [arkInstalled, metaMaskInstalled]);

  const Icon = (): JSX.Element => {
    const icons = {
      [InstallationStatus.NONE]: [InstallLight, InstallDark],
      [InstallationStatus.BOTH]: [
        ConnectArkMetamaskLight,
        ConnectArkMetamaskDark,
      ],
      [InstallationStatus.ARK_CONNECT]: [ConnectArkLight, ConnectArkDark],
      [InstallationStatus.METAMASK]: [
        ConnectMetamaskLight,
        ConnectMetamaskDark,
      ],
    };

    const IconComponent = icons[installationStatus][
      Number(darkMode)
    ] as ComponentType;
    return <IconComponent />;
  };

  const dividerText = useMemo(() => {
    return {
      [InstallationStatus.NONE]: t("OR"),
      [InstallationStatus.BOTH]: t("OR"),
      [InstallationStatus.METAMASK]: t("OR_INSTALL_ARK_CONNECT"),
      [InstallationStatus.ARK_CONNECT]: t("OR_INSTALL_METAMASK"),
    }[installationStatus];
  }, [installationStatus, t]);

  return (
    <div className="bg-white mx-auto w-full sm:w-96 overflow-hidden shadow-sm rounded-xl dark:bg-subtle-black">
      <div className="text-center flex flex-col items-center p-8 dark:text-white">
        <H3>{t("WELCOME")}</H3>

        <div>
          <p className="text-md mb-4 text-theme-gray-500 dark:text-theme-gray-300">
            {installationStatus === InstallationStatus.NONE
              ? t("INSTALL_EXTENSION")
              : t("CONNECT_ARK_CONNECT_TO_START")}
          </p>

          <div className="w-2/3 mx-auto">
            <Icon />
          </div>
        </div>

        <div
          className={cn(
            "h-12 mt-6 flex flex-col items-center justify-center min-h-fit w-full",
            {
              "flex-col-reverse":
                installationStatus === InstallationStatus.METAMASK,
            },
          )}
        >
          {!connecting && (
            <>
              {!arkInstalled && (
                <LinkButton
                  href={arkExtensionUrl}
                  isExternal
                  variant="transparent"
                  className="mt-2 w-full border rounded-lg border-[#d3d3d3] dark:border-theme-gray-500 justify-start px-5 py-4 group hover:border-transparent dark:hover:border-transparent"
                >
                  <div className="space-x-3 flex items-center group-hover:text-white">
                    <ArkConnectLogo className="w-5 text-theme-primary-green-700 dark:text-theme-primary-green-600 group-hover:text-white" />
                    <span>{t("ARK_CONNECT_EXTENSION")}</span>
                  </div>
                </LinkButton>
              )}

              {arkInstalled && (
                <Button
                  onClick={() => {
                    void connect();
                  }}
                  isExternal
                  variant="transparent"
                  className="mt-2 w-full border rounded-lg border-[#d3d3d3] dark:border-theme-gray-500 justify-start px-5 py-4 group hover:border-transparent dark:hover:border-transparent"
                >
                  <div className="space-x-3 flex items-center group-hover:text-white">
                    <ArkConnectLogo className="w-5 text-theme-primary-green-700 dark:text-theme-primary-green-600 group-hover:text-white" />
                    <span>{t("ARK_CONNECT_EXTENSION")}</span>
                  </div>
                </Button>
              )}

              <Divider text={dividerText} />

              {!metaMaskInstalled && (
                <LinkButton
                  href={metaMaskExtensionUrl}
                  isExternal
                  variant="transparent"
                  className="mt-2 w-full border rounded-lg border-[#d3d3d3] dark:border-theme-gray-500 justify-start px-5 py-4 group hover:border-transparent dark:hover:border-transparent"
                >
                  <div className="space-x-3 flex items-center group-hover:text-white">
                    <MetaMaskLogo className="w-5 text-theme-primary-green-700" />
                    <span>{t("METAMASK_EXTENSION")}</span>
                  </div>
                </LinkButton>
              )}

              {metaMaskInstalled && (
                <Button
                  onClick={() => {
                    connectMetaMask();
                  }}
                  variant="transparent"
                  className="mt-2 w-full border rounded-lg border-[#d3d3d3] dark:border-theme-gray-500 justify-start px-5 py-4 group hover:border-transparent dark:hover:border-transparent"
                >
                  <div className="space-x-3 flex items-center group-hover:text-white">
                    <MetaMaskLogo className="w-5 text-theme-primary-green-700" />
                    <span>{t("METAMASK_EXTENSION")}</span>
                  </div>
                </Button>
              )}
            </>
          )}

          {connecting && (
            <div className="flex items-center space-x-3">
              <Spinner className="w-8" />
              <p className="text-lg font-medium leading-[1.406rem]">
                {t("CONNECTING")}
              </p>
            </div>
          )}
        </div>
      </div>

      {connecting && <Alert>{t("CLICK_TO_CONFIRM_WALLET_CONNECT")}</Alert>}

      {error && (
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

export const Divider = ({ text }: { text: string }) => (
  <div className="flex items-center px-2.5 w-full mt-2">
    <hr className="flex-grow border-[#d3d3d3] dark:border-theme-gray-700 border-t border-dashed border-gray-300" />
    <span className="mx-3 text-theme-gray-500 text-xs">{text}</span>
    <hr className="flex-grow border-[#d3d3d3] dark:border-theme-gray-700 border-t border-dashed border-gray-300" />
  </div>
);

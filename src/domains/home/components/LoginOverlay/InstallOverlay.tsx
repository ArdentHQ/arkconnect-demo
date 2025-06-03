import { useTranslation } from "next-i18next";
import InstallLight from "@/public/images/install-light.svg";
import InstallDark from "@/public/images/install-dark.svg";
import { H3 } from "@/app/components/Typography";
import { LinkButton } from "@/app/components/Button";
import ArkConnectLogo from "@/public/icons/logo.svg";
import MetaMaskLogo from "@/public/icons/metamask-logo.svg";
import { useDarkMode } from "@/app/contexts/useDarkModeContext";
import { useExtensionUrls } from "@/app/hooks/useExtensionUrls";

export const InstallOverlay = () => {
  const { t } = useTranslation();
  const { darkMode } = useDarkMode();

  const { arkExtensionUrl, metaMaskExtensionUrl } = useExtensionUrls();

  return (
    <div className="bg-white mx-auto w-full sm:w-96 overflow-hidden shadow-sm rounded-xl dark:bg-subtle-black">
      <div className="p-8">
        <div className="text-center flex flex-col items-center dark:text-white">
          <H3>{t("WELCOME")}</H3>

          <div className="mb-6 mt-2">
            <p className="text-md mb-4 text-theme-gray-500 dark:text-theme-gray-300">
              {t("INSTALL_EXTENSION")}
            </p>

            <div className="w-2/3 mx-auto">
              {darkMode ? <InstallDark /> : <InstallLight />}
            </div>
          </div>

          {arkExtensionUrl && metaMaskExtensionUrl && (
            <div className="space-y-2 w-full">
              <LinkButton
                href={process.env.ARK_CHROME_EXTENSION_URL}
                isExternal
                variant="transparent"
                hoverClassName="hover:bg-theme-primary-green-700 hover:border-transparent dark:hover:border-transparent group"
                className="w-full border rounded-lg border-[#d3d3d3] dark:border-theme-gray-500 justify-start px-5 py-4"
              >
                <div className="space-x-3 flex items-center group-hover:text-white">
                  <ArkConnectLogo className="w-5 text-theme-primary-green-700 group-hover:text-white" />
                  <span>{t("ARK_CONNECT_EXTENSION")}</span>
                </div>
              </LinkButton>

              <Divider text={"or"} />

              <LinkButton
                href={metaMaskExtensionUrl}
                isExternal
                variant="transparent"
                hoverClassName="hover:bg-theme-primary-green-700 hover:border-transparent dark:hover:border-transparent group"
                className="w-full border rounded-lg border-[#d3d3d3] dark:border-theme-gray-500 justify-start px-5 py-4"
              >
                <div className="space-x-3 flex items-center group-hover:text-white">
                  <MetaMaskLogo className="w-5 text-theme-primary-green-700" />
                  <span>{t("METAMASK_EXTENSION")}</span>
                </div>
              </LinkButton>
            </div>
          )}
        </div>
      </div>
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

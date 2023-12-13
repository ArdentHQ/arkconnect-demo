import { useTranslation } from "next-i18next";
import Install from "@/public/images/install.svg";
import { H3 } from "@/app/components/Typography";
import { ExternalButtonLink } from "@/app/components/Button";
import WalletLogo from "@/public/icons/logo.svg";

export const InstallOverlay = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white mx-auto w-full sm:w-96 overflow-hidden shadow-sm rounded-xl">
      <div className="p-8">
        <div className="text-center flex flex-col items-center">
          <H3>{t("WELCOME")}</H3>

          <div className="mb-6">
            <p className="text-md mb-4 text-theme-secondary-500">
              {t("INSTALL_ARK_CONNECT_TO_START")}
            </p>

            <div className="w-2/3 mx-auto">
              <Install />
            </div>
          </div>

          <ExternalButtonLink href={process.env.ARK_FIREFOX_EXTENSION_URL}>
            <WalletLogo className="w-4" />
            <span>{t("INSTALL_WALLET")}</span>
          </ExternalButtonLink>
        </div>
      </div>
    </div>
  );
};

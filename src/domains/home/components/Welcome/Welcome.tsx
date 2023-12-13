import { useTranslation } from "next-i18next";
import Connect from "@/public/images/connect.svg";
import { H3 } from "@/app/components/Typography";
import { Button } from "@/app/components/Button";

export const Welcome = () => {
  const { t } = useTranslation();
  return (
    <div className="mx-auto w-full sm:w-96 shadow-sm rounded-xl bg-white">
      <div className="p-8">
        <div className="text-center flex flex-col items-center">
          <H3>{t("WELCOME")}</H3>

          <div className="">
            <p className="text-md mb-4 text-theme-secondary-500">
              {t("CONNECT_ARK_CONNECT_TO_START")}
            </p>

            <div className="w-2/3 mx-auto">
              <Connect />
            </div>
          </div>

          <Button className="mt-6">{t("CONNECT_WALLET")}</Button>
        </div>
      </div>
    </div>
  );
};

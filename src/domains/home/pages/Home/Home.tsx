import { useTranslation } from "next-i18next";

export const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center h-screen font-bold">
      {t("APP_NAME")}
    </div>
  );
};

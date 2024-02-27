import Head from "next/head";

import { ReactElement } from "react";
import { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { Navbar } from "@/app/components/Navbar";

export const Layout = ({ children }: { children: ReactElement }) => {
  const { t } = useTranslation();
  return (
    <div id="layout" className="flex flex-col min-h-screen">
      <Head>
        <title>{t("PAGE_TITLE")}</title>
      </Head>
      <Navbar />
      {children}
      <Toaster position="bottom-right" gutter={15} />
    </div>
  );
};

/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { Home as HomePage } from "@/domains/home/pages/Home";

export default function Home() {
  return <HomePage />;
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "transactions"])),
      // Will be passed to the page component as props
    },
  };
}

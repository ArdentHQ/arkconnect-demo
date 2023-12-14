import "@/app/styles/globals.css";

import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";

import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div className={`${dmSans.variable} font-sans`}>
      <Component {...pageProps} />;
    </div>
  );
};

export default appWithTranslation(App);

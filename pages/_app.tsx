import "@/app/styles/globals.css";

import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { DM_Sans } from "next/font/google";

import { useState } from "react";
import {
  ReactQueryClient,
  ReactQueryProvider,
} from "@/app/contexts/ReactQuery";

const dmSans = DM_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => ReactQueryClient());

  return (
    <ReactQueryProvider client={queryClient}>
      <div className={`${dmSans.variable} font-sans`}>
        <Component {...pageProps} />;
      </div>
    </ReactQueryProvider>
  );
};

export default appWithTranslation(App);

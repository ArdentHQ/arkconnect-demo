import "@/app/styles/globals.css";

import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { DM_Sans } from "next/font/google";

import { useState } from "react";
import {
  ReactQueryClient,
  QueryClientProvider,
} from "@/app/contexts/ReactQuery";
import { ModalContextProvider } from "@/app/contexts/ModalContext/ModalContext";

const dmSans = DM_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => ReactQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ModalContextProvider>
        <div className={`${dmSans.variable} font-sans`}>
          <Component {...pageProps} />;
        </div>
      </ModalContextProvider>
    </QueryClientProvider>
  );
};

export default appWithTranslation(App);

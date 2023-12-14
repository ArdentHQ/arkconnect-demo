import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const useAppFont = () => {
  return `${dmSans.variable} font-sans`;
};

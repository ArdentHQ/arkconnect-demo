import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

/**
 * Make sure to include the font
 * variable in `tailwind.config.js.
 *
 * Example:
 * {
 *  ...
 *   fontFamily: {
 *     sans: ["--font-dm-sans"],
 *   },
 * };
 */
export const AppFont = () => (
  <style jsx global>
    {`
      html {
        --font-dm-sans: ${dmSans.style.fontFamily};
      }
    `}
  </style>
);


import "./globals.css";
import { Jersey_15, Oswald, Dancing_Script } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { indexData } from "@/lib/content-lib";


const APP_TITLE = process.env.NEXT_PUBLIC_APP_NAME;
const APP_NAME_FULL = process.env.NEXT_PUBLIC_APP_NAME_FULL;

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_DOMAIN),
  title: `${APP_TITLE} - ${indexData.app_title_descr || 'Lorem ipsum dolor sit.'}`,
  description: `${APP_TITLE} App -  ${indexData?.description || 'Lorem ipsum dolor sit.'}`,
  keywords: indexData.keywords ?? `Lorem, ipsum`,

  alternates: {
    canonical: './',
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: '1.0',
  maximumScale: '1.0',
  minimumScale: '1.0',
  userScalable: 'no',
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
}


const jersey = Jersey_15({
  variable: "--font-jersey",
  weight: ['400'],
  subsets: ["latin"],
})
const oswald = Oswald({
  variable: '--font-oswald',
  weight: ['200', '300', '400', '500', '600', '700'],
  subsets: ['latin', 'cyrillic'],
})
const dancing_script = Dancing_Script({
  variable: '--font-dancing',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

export default function RootLayout({ children }) {
  return (
    <html className={`${dancing_script.variable} ${jersey.variable} ${oswald.variable}`} lang="en" suppressHydrationWarning={true}>
      <body>
        {children}
      </body>
      {
        process.env.NODE_ENV !== "development" && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_GTM} />
      }
    </html>

  );
}

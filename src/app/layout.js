
import "./globals.css";
import { Spectral, Platypi, Recursive, Ysabeau, Mali, Inconsolata, } from "next/font/google";
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

const spectral = Spectral({
  variable: '--font-spectral',
  weight: ['300', '400', '500', '600'],
  subsets: ['latin', 'cyrillic'],
})

const platypi = Platypi({
  variable: '--font-platypi',
  weight: ['300', '400', '500', '600'],
  subsets: ['latin']
})

const recursive = Recursive({
  variable: '--font-recursive',
  weight: ['300', '400', '500', '600'],
  subsets: ['cyrillic-ext', 'latin']
})

const ysabeau = Ysabeau({
  variable: '--font-ysabeau',
  weight: ['300', '400', '500', '600'],
  subsets: ['latin', 'cyrillic'],
})

const mali = Mali({
  variable: '--font-mali',
  weight: ['300', '400', '500', '600'],
  subsets: ['latin']
})

const inconsolata = Inconsolata({
  variable: '--font-inconsolata',
  weight: ['300', '400', '500', '600'],
  subsets: ['latin']
})

export default function RootLayout({ children }) {
  return (
    <html className={`${ysabeau.variable} ${recursive.variable} ${platypi.variable} ${spectral.variable} ${mali.variable} ${inconsolata.variable}`} lang="en" suppressHydrationWarning={true}>
      <body>
        {children}
      </body>
      {
        process.env.NODE_ENV !== "development" && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_GTM} />
      }
    </html>

  );
}

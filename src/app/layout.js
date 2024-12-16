
import { GoogleTagManager } from "@next/third-parties/google";

import { Providers } from "./providers";
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
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      {
        process.env.NODE_ENV !== "development" && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_GTM} />
      }
      <body>

        <Providers>
          {children}
        </Providers>

      </body>

    </html>
  )
}

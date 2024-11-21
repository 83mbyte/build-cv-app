
import { GoogleTagManager } from "@next/third-parties/google";

import { Providers } from "./providers";
import { indexData } from "@/lib/content-lib";

const APP_TITLE = process.env.NEXT_PUBLIC_APP_NAME;
const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION;

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_DOMAIN),
  title: `${APP_TITLE} - Effortlessly make a job-worthy resume.`,
  description: `${APP_TITLE} App - The best online resume maker. ${APP_DESCRIPTION}`,
  keywords: indexData.keywords ?? `Lorem ipsum`,
  alternates: {
    canonical: './',
  }
};

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

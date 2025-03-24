import { toolkitData } from "@/lib/content-lib";

export const metadata = {
    title: `${process.env.NEXT_PUBLIC_APP_NAME} - ${toolkitData.pageTitle ?? 'title lorem ipsum'}`,
    description: `${process.env.NEXT_PUBLIC_APP_NAME} - ${toolkitData.pageDescription ?? 'lorem ipsum'}`,
    // manifest: './icons/site.webmanifest',
}


export default function ToolkitLayout({ children }) {
    return (
        children
    )
}
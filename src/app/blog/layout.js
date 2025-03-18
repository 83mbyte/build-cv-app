import { blogData } from "@/lib/content-lib"
import Link from "next/link"

export const metadata = {
    title: `${process.env.NEXT_PUBLIC_APP_NAME} - Blog`,
    description: `${process.env.NEXT_PUBLIC_APP_NAME} - ${blogData.pageDescription ?? 'Lorem ipsum '}`,
    // manifest: './icons/site.webmanifest',
}

export default function BlogLayout({ children }) {
    return (

        <section>

            <div style={{ minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                {/* TODO create styled header */}
                {/* TODO create styled header */}
                {/* TODO create styled header */}
                <div style={{ backgroundColor: 'white', height: '30px', borderBottom: '1px solid gray', width: '100%', zIndex: 1000, position: 'fixed' }}><Link href='/'>{process.env.NEXT_PUBLIC_APP_NAME}</Link> the chill corner.</div>

                <div style={{ marginTop: '40px', }}>
                    {children}
                </div>

                {/* TODO add footer */}
                {/* TODO add footer */}
                <div>footer copyright</div>
            </div>
        </section>
    )
}
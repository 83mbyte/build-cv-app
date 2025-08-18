import { blogData } from "@/lib/content-lib";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: `${process.env.NEXT_PUBLIC_APP_NAME} - Blog`,
    description: `${process.env.NEXT_PUBLIC_APP_NAME} - ${blogData.pageDescription ?? 'Lorem ipsum '}`,
    // manifest: './icons/site.webmanifest',
    alternates: {
        canonical: './',
    }
}


export default function BlogLayout({ children }) {
    return (

        <div style={{ minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', position: 'relative', }}>

            <header style={{ backgroundColor: '', borderBottom: '0px solid gray', width: '100%', zIndex: 1000, padding: '0.75rem', position: 'fixed' }}>
                <div style={{ color: 'white', fontSize: '1.125rem', backgroundColor: 'rgba(0, 0, 0, 0.64)', padding: '0.5rem', borderRadius: '0.375rem' }}>

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: '10px', paddingInline: '10px' }}>
                        <Link href='/' style={{ color: 'white', textDecoration: 'none', }}>
                            <Image src='/android-chrome-192x192.png' width={24} height={24} alt={`${process.env.NEXT_PUBLIC_APP_NAME_FULL} logo`}
                                style={{ borderRadius: '50%' }}
                            />
                        </Link>
                        <div  >{process.env.NEXT_PUBLIC_APP_NAME_FULL} - the chill corner.</div>
                    </div>

                </div>
            </header >

            <main style={{ marginTop: '40px', backgroundColor: '', display: 'flex', flex: 1, alignItems: 'center' }}>
                {children}
            </main>

            <footer style={{ fontSize: '0.5rem', marginBottom: '0.5rem' }}>{process.env.NEXT_PUBLIC_APP_NAME_FULL}&nbsp;©&nbsp;{new Date().getFullYear()}&nbsp;&nbsp;</footer>
        </div >

    )
}
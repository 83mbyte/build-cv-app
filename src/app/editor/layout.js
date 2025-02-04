
export const metadata = {
    title: `${process.env.NEXT_PUBLIC_APP_NAME} - Resume Editor page`,
    description: `${process.env.NEXT_PUBLIC_APP_NAME} - Create your resume easily.`,
    // manifest: './icons/site.webmanifest',
}

export default function EditorLayout({ children }) {
    return (
        <>
            {children}
        </>
    )
}
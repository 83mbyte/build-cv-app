
export const metadata = {
    title: `${process.env.NEXT_PUBLIC_APP_NAME} - Login page`,
    description: `${process.env.NEXT_PUBLIC_APP_NAME} - Access your account to edit your resume.`,
    // manifest: './icons/site.webmanifest',
}

export default function LoginLayout({ children }) {
    return (
        <>
            {children}
        </>
    )
}
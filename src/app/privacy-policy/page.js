import PrivacyPolicy from "@/components/privacy_page/PrivacyPolicy";

export const metadata = {
    title: `${process.env.NEXT_PUBLIC_APP_NAME} - Privacy Policy`,
    description: `Learn how ${process.env.NEXT_PUBLIC_APP_NAME} collects, uses, and protects your personal information.`,
};

export default function Privacy_Page() {

    return (
        <PrivacyPolicy />
    )
}
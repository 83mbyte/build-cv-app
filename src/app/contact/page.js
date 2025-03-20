import ContactUsContainer from "@/components/contact_page/ContactUsContainer";
import { contactUsData } from "@/lib/content-lib";

export const metadata = {
    title: `${process.env.NEXT_PUBLIC_APP_NAME} - Contact us`,
    description: `${process.env.NEXT_PUBLIC_APP_NAME} - ${contactUsData.pageDescription ?? 'Lorem ipsum '}`,
}

export default async function Contact_Page() {

    return (
        <ContactUsContainer />
    )
}
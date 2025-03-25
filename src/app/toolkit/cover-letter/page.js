import ToolkitPageWrapper from "@/components/toolkit_page/ToolkitPageWrapper"
import CoverLetterContainer from "@/components/toolkit_page/coverLetter/CoverLetterContainer"
import { toolkitData } from "@/lib/content-lib"

export const metadata = {
    title: `${process.env.NEXT_PUBLIC_APP_NAME} - Create your Cover Letter`,
    description: `${process.env.NEXT_PUBLIC_APP_NAME} -  ${toolkitData.tools.coverLetter.description}`,
    // manifest: './icons/site.webmanifest',
}

export default async function CoverLetter_Page() {


    return (

        <ToolkitPageWrapper>
            <CoverLetterContainer pageHeading={toolkitData.tools.coverLetter.title} pageText={toolkitData.tools.coverLetter.pageText} placeholders={toolkitData.tools.coverLetter.placeholders} />
        </ToolkitPageWrapper>
    )
} 
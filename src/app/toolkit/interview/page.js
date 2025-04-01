import ToolkitPageWrapper from "@/components/toolkit_page/ToolkitPageWrapper";
import InterviewContainer from "@/components/toolkit_page/interview/InterviewContainer";
import { toolkitData } from "@/lib/content-lib";

export const metadata = {
    title: `${process.env.NEXT_PUBLIC_APP_NAME} - Job Interview Practice`,
    description: `${process.env.NEXT_PUBLIC_APP_NAME} -  ${toolkitData.tools.interview.description}`,
    // manifest: './icons/site.webmanifest',
}

export default async function Interview_Page() {


    return (

        <ToolkitPageWrapper>
            <InterviewContainer pageHeading={toolkitData.tools.interview.title} pageText={toolkitData.tools.interview.pageText} placeholders={toolkitData.tools.interview.placeholders} />
        </ToolkitPageWrapper>
    )
} 
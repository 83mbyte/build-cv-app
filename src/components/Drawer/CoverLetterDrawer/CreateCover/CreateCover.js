import { Box } from "@chakra-ui/react";

import SectionDescription from "@/components/Dashboard/MainArea/SectionDescription";
import SectionWrapper from "@/components/Dashboard/MainArea/SectionsWrapper";
import TextEditor from "@/components/FormItems/TextEditor/TextEditor";
import LoadingSectionSkeleton from "@/components/Loaders/LoadingSectionSkeleton";


const CreateCover = ({ state, onChangeHandler }) => {

    let content = null;
    const { data, status, error } = state;


    if (status === 'ready' && data && data !== undefined) {
        content =
            <SectionWrapper sectionTitle={'Write a Cover Letter'} flexDirect={'column'}>
                <SectionDescription value={"Write a few paragraphs explaining why you are the ideal candidate for a job."} />

                <TextEditor state={data} onChangeCallback={onChangeHandler} heightSize={'200px'} />
            </SectionWrapper>
    }
    else if (status === 'ready' && (data === undefined || !data)) {
        content = <Box p={'10px'}>Something wrong - missed data for the Summary section.</Box>
    }
    else if (status === 'failed') {
        content = <Box p={'10px'}>Something wrong. {error}</Box>
    }
    else {
        content = <LoadingSectionSkeleton rowsNumber={0} textArea={true} />
    }

    return (
        <>
            {content}
        </>
    )
}

export default CreateCover;
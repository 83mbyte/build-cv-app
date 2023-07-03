import { Box } from "@chakra-ui/react";
import TextEditor from "../../FormElements/TextEditor/TextEditor";
import SectionDescription from "../../Sections/SectionDescription";
import SectionWrapper from "../../Wrappers/SectionWrapper";
import LoadingSectionSkeleton from "../../Progress/LoadingSectionSkeleton";

const CreateCover = ({ state, onChangeHandler }) => {

    let content = null;
    const { data, status, error } = state;


    if (status === 'ready' && data && data !== undefined) {
        content =
            <SectionWrapper sectionTitle={'Letter Details'} flexDirect={'column'}>
                <SectionDescription value={"Write a few paragraphs explaining why you are the ideal candidate for a job."} />

                <TextEditor state={data} onChangeCallback={onChangeHandler} heightSize={'coverLetter'} />
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
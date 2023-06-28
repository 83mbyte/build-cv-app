import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSummary, inputSummaryUpdate } from '../../redux/features/summary/summarySlice';
import { setIsModifiedContent } from '../../redux/features/utility/utilitySlice';
import TextEditor from '../FormElements/TextEditor/TextEditor';
import LoadingSectionSkeleton from '../Progress/LoadingSectionSkeleton';
import SectionWrapper from '../Wrappers/SectionWrapper';
import SectionDescription from './SectionDescription';
import AISummaryHelperContainer from '../AIHelper/AISummaryHelperContainer';

const Summary = ({ loggedUser }) => {
    let content = null;
    const dispatch = useDispatch();
    const data = useSelector(state => state.summary.data);
    const status = useSelector(state => state.summary.status);
    const error = useSelector(state => state.summary.error);
    const isSectionVisible = useSelector(state => state.summary.__serv.isSectionVisible);

    const skills = useSelector(state => state.skills.data);
    const languages = useSelector(state => state.languages.data);

    const onChangeHandler = (data) => {
        dispatch(setIsModifiedContent({ status: true, section: 'summary' }));
        dispatch(inputSummaryUpdate({ value: data }));
    }

    if (status === 'ready' && data && data !== undefined) {
        content = isSectionVisible &&
            <SectionWrapper sectionTitle={'Professional Summary'} flexDirect={'column'} >
                <SectionDescription value={"Write 2-4 short & energetic sentences to interest the reader! Mention your role, experience & most importantly - your biggest achievements, best qualities and skills."} />

                <AISummaryHelperContainer data={{ skills, languages }} callback={onChangeHandler} />

                <TextEditor state={data} onChangeCallback={onChangeHandler} />
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

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getSummary(loggedUser))
        }
    }, [loggedUser, status, dispatch])

    return (
        <>
            {content}
        </>
    );
};

export default Summary;
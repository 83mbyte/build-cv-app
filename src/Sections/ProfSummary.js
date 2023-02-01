import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Wysiwyg from '../components/FormElements/WYSIWYG/Wysiwyg';
import SpinnerCustom from '../components/Spinner/SpinnerCustom';
import { fetchSummary, summaryStateValueUpdate } from '../redux/features/summary/summarySlice';
import { setIsModifiedTrue } from '../redux/features/utility/utilitySlice';
import SectionContainer from './SectionContainer';
import SectionDescription from './SectionDescription';

const ProfSummary = ({ title, user }) => {
    let content;
    const dispatch = useDispatch();
    const data = useSelector(state => state.summary.data);
    const stateStatus = useSelector(state => state.summary.status);
    const error = useSelector(state => state.summary.error);

    const handleInputChange = (path, value) => {
        //update state with a value
        dispatch(summaryStateValueUpdate(value));
        dispatch(setIsModifiedTrue({ status: true, section: 'summary' }))
    }


    if (stateStatus === 'loading') {
        content = <SpinnerCustom />
    }
    else if ((stateStatus === 'succeeded' && data === undefined) || !data) {
        content = <Box>Something wrong - missed data.</Box>
    }
    else if (stateStatus === 'failed') {
        content = <Box>{error}</Box>
    }
    else if (stateStatus === 'succeeded' && data) {
        //show WYSIWG editor if OKstate, path, handleInputChange
        content = <Wysiwyg state={data} handleInputChange={handleInputChange} path={data.path} />
    }

    useEffect(() => {
        if (stateStatus === 'idle') {
            //get data from server
            dispatch(fetchSummary(user));
        }
    }, [stateStatus, dispatch, user]);


    return (
        <SectionContainer headingTxt={title} type="flex" flexDirect='column'>
            <SectionDescription value={"Write 2-4 short & energetic sentences to interest the reader! Mention your role, experience & most importantly - your biggest achievements, best qualities and skills."} />

            {/* if OK render WYSIWYG editor */}
            {content}

        </SectionContainer>
    );
};

export default ProfSummary;
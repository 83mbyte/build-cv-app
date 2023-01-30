import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Wysiwyg from '../components/FormElements/WYSIWYG/Wysiwyg';
import SpinnerCustom from '../components/Spinner/SpinnerCustom';
import { fetchSummary, putDataSummary, summaryStateValueUpdate } from '../redux/features/summary/summarySlice';
import SectionContainer from './SectionContainer';
import SectionDescription from './SectionDescription';

const ProfSummary = ({ title, user }) => {
    let content;
    const dispatch = useDispatch();
    const data = useSelector(state => state.summary.data);
    const stateStatus = useSelector(state => state.summary.status);
    const error = useSelector(state => state.summary.error);

    const handleEditorChange = ({ path, value }) => {
        //update state with a value
        dispatch(summaryStateValueUpdate(value));
        saveToServer(user, path, value)
    }
    const saveToServer = (user, path, value) => {
        //save on server
        let dataToSave = { user, path, value };
        dispatch(putDataSummary(dataToSave))
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
        //show WYSIWG editor if OK
        content = <Wysiwyg state={data} user={user} handleEditorChange={handleEditorChange} path={data.path} />
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
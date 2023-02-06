import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccordionContainer from '../components/Accordion/AccordionContainer';
import SpinnerCustom from '../components/Spinner/SpinnerCustom';
import { addNewEmpHistoryItem, empHistoryStateValueUpdate, fetchEmploymentHistory, removeEmpHistoryItem } from '../redux/features/employmentHistory/employmentHistorySlice';
import SectionContainer from './SectionContainer';
import SectionDescription from './SectionDescription';

const EmploymentHistory = ({ title, user }) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.employmentHistory.data);
    const stateStatus = useSelector(state => state.employmentHistory.status);
    const error = useSelector(state => state.employmentHistory.error);

    let content;
    if (stateStatus === 'loading') {
        <SpinnerCustom />
    } else if ((stateStatus === 'succeeded' && data === undefined) || !data) {
        content = <Box>Something wrong - missed data.</Box>
    }
    else if (stateStatus === 'failed') {
        content = <Box>{error}</Box>
    }
    else if (stateStatus === 'succeeded' && data) {

        content = <AccordionContainer
            inputsOrder={['title', 'period', 'employer', 'location', 'wysiwyg']}
            state={data}
            sectionName={'employmentHistory'}
            addOneMoreValue={'employment'}
            removeItemAction={removeEmpHistoryItem}
            addNewItemAction={addNewEmpHistoryItem}
            valueUpdateAction={empHistoryStateValueUpdate}
        />
    }

    useEffect(() => {
        if (stateStatus === 'idle') {
            dispatch(fetchEmploymentHistory(user));
        }
    }, [stateStatus, user, dispatch])

    return (
        <SectionContainer headingTxt={title} type="flex" flexDirect='column'>
            <SectionDescription value={'Show your relevant experience (last 10 years). Use bullet points to note your achievements, if possible - use numbers/facts (Achieved X, measured by Y, by doing Z).'} />

            {content}
        </SectionContainer >
    );
};

export default EmploymentHistory;
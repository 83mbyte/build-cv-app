import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccordionContainer from '../components/Accordion/AccordionContainer';
import SpinnerCustom from '../components/Spinner/SpinnerCustom';
import { educationStateValueUpdate, fetchEducation, addNewEducationItem, removeEducationItem } from '../redux/features/education/educationSlice';

import SectionContainer from './SectionContainer';
import SectionDescription from './SectionDescription';

const Education = ({ title, user }) => {

    const dispatch = useDispatch();
    const data = useSelector(state => state.education.data);
    const stateStatus = useSelector(state => state.education.status);
    const error = useSelector(state => state.education.error);

    useEffect(() => {
        if (stateStatus === 'idle') {
            dispatch(fetchEducation(user))
        }
    }, [stateStatus, dispatch, user]);


    let content;
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

        content = <AccordionContainer
            state={data}
            sectionName={'education'}
            addOneMoreValue={'education'}
            inputsOrder={['title', 'period', 'degree', 'location', 'wysiwyg']}
            removeItemAction={removeEducationItem}
            addNewItemAction={addNewEducationItem}
            valueUpdateAction={educationStateValueUpdate}
        />
    }

    return (
        <SectionContainer headingTxt={title} type="flex" flexDirect='column'>
            <SectionDescription value={"A varied education on your resume sums up the value that your learnings and background will bring to job."} />

            {content}

        </SectionContainer>
    );
};

export default Education;
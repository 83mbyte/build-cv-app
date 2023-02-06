import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccordionContainer from '../components/Accordion/AccordionContainer';
import SpinnerCustom from '../components/Spinner/SpinnerCustom';
import { addNewCoursesItem, coursesStateValueUpdate, fetchCourses, removeCoursesItem } from '../redux/features/courses/coursesSlice';
import SectionContainer from './SectionContainer';

const Courses = ({ title, user }) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.courses.data);
    const stateStatus = useSelector(state => state.courses.status);
    const error = useSelector(state => state.courses.error);

    let content;
    if (stateStatus == 'loading') {
        content = <SpinnerCustom />
    } else if ((stateStatus === 'succeeded' && data === undefined) || !data) {
        content = <Box>Something wrong - missed data.</Box>
    }
    else if (stateStatus === 'failed') {
        content = <Box>{error}</Box>
    }
    else if (stateStatus === 'succeeded' && data) {

        content = <AccordionContainer
            inputsOrder={['course', 'period', 'institution', 'certificate']}
            state={data}
            sectionName={'courses'}
            addOneMoreValue={'course'}
            removeItemAction={removeCoursesItem}
            addNewItemAction={addNewCoursesItem}
            valueUpdateAction={coursesStateValueUpdate}
        />
    }

    useEffect(() => {
        if (stateStatus === 'idle') {
            dispatch(fetchCourses(user))
        }
    }, [stateStatus, user, dispatch])
    return (

        <SectionContainer headingTxt={title} type="flex" flexDirect='column'>

            {content}
        </SectionContainer >
    );
};

export default Courses;
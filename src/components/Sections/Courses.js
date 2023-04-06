import React, { useEffect } from 'react';
import { Accordion, Box, SimpleGrid, } from '@chakra-ui/react';

import SectionWrapper from '../Wrappers/SectionWrapper';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSectionSkeleton from '../Progress/LoadingSectionSkeleton';
import { addCoursesItem, getCourses, inputCoursesUpdate, removeCoursesItem } from '../../redux/features/courses/coursesSlice';
import AccordionElem from '../Accordion/AccordionElem';
import AddMoreItemBtn from '../AddMoreItemBtn/AddMoreItemBtn';
import { setIsModifiedContent } from '../../redux/features/utility/utilitySlice';
import InputCustom from '../FormElements/InputCustom';


const Courses = ({ loggedUser }) => {
    let content;
    const dispatch = useDispatch();

    const data = useSelector(state => state.courses.data);
    const status = useSelector(state => state.courses.status);
    const error = useSelector(state => state.courses.error);
    const isSectionVisible = useSelector(state => state.courses.__serv.isSectionVisible);

    const addItem = () => {
        dispatch(addCoursesItem())
    }
    const removeItem = (e, itemToRemove) => {
        e.preventDefault();
        let indexToRemove = data.findIndex((elem) => elem === itemToRemove);
        dispatch(removeCoursesItem(indexToRemove));
        dispatch(setIsModifiedContent({ status: true, section: 'courses' }));
    }
    const onChangeHandler = (index, name, value,) => {
        dispatch(inputCoursesUpdate({ arrayIndex: index, inputName: name, value: value }));
        dispatch(setIsModifiedContent({ status: true, section: 'courses' }));
    }


    if (status === 'loading') {
        content = <LoadingSectionSkeleton rowsNumber={0} textArea={true} />
    }
    else if ((status === 'ready' && data === undefined) || !data) {
        content = <Box>Something wrong - missed data.</Box>
    }
    else if (status === 'failed') {
        content = <Box>{error}</Box>
    }
    else if (status === 'ready' && data) {
        content = isSectionVisible &&
            <CoursesForm data={data} addItem={addItem} removeItem={removeItem} onChangeHandler={onChangeHandler} />
    }

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getCourses(loggedUser));
        }
    }, [status, loggedUser, dispatch])
    return (
        <>
            {content}
        </>
    );
};

export default Courses;

const CoursesForm = ({ data, addItem, removeItem, onChangeHandler }) => {
    return (
        <SectionWrapper sectionTitle={'Courses'} flexDirect='column'>

            <Accordion allowToggle allowMultiple={false}>

                {
                    data.map((elem, index) => {
                        return (

                            <AccordionElem index={index} key={`course_${index}`} title={elem.course} removeItem={(e) => removeItem(e, data[index])}>
                                <SimpleGrid columns={[1, 1, 2]} alignItems={'center'} justifyContent={'center'}>
                                    <InputCustom labelText={'Course'} name={'course'} inputValue={elem.course} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />
                                    <InputCustom labelText={'Institution'} name={'institution'} inputValue={elem.institution} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />
                                    <InputCustom labelText={'Start-End Date'} name={'period'} inputValue={elem.period} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />
                                    <InputCustom labelText={'Link To Certificate'} name={'cert'} inputValue={elem.cert} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />
                                </SimpleGrid>
                            </AccordionElem>
                        )
                    })
                }
                <Box>
                    <AddMoreItemBtn itemType={'course'} onClickCallback={addItem} />
                </Box>
            </Accordion>
        </SectionWrapper>
    )
}
import { useEffect } from 'react';
import { Accordion, Box, SimpleGrid } from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { addCoursesItem, getCourses, inputCoursesUpdate, removeCoursesItem } from '@/redux/features/courses/coursesSlice';
import { putAdditionalSectionsOnServerThunk, setIsModifiedContent } from '@/redux/features/utility/utilitySlice';

import LoadingSectionSkeleton from '@/components/Loaders/LoadingSectionSkeleton';
import SectionWrapper from '../SectionsWrapper';
import AccordionElem from '@/components/Accordion/AccordionElem';
import DashboardInput from '@/components/FormItems/DashboardInputs/DashboardInput';
import AddMoreItemBtn from '@/components/AddMoreItemBtn/AddMoreItemBtn';

const Courses = ({ userLogged }) => {
    let content;
    const dispatch = useDispatch();
    const data = useSelector(state => state.courses.data);
    const status = useSelector(state => state.courses.status);
    const error = useSelector(state => state.courses.error);
    const additionalSections = useSelector(state => state.utility.additionalSections.data);


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

    const hidingClickHandler = () => {
        let index = additionalSections.indexOf('courses');
        let tmp = [...additionalSections];
        tmp.splice(index, 1);
        dispatch(putAdditionalSectionsOnServerThunk({
            user: userLogged.userId,
            token: userLogged.accessToken,
            data: tmp
        }));
    }

    // content to show

    if (status === 'loading') {
        content = <LoadingSectionSkeleton rowsNumber={0} textArea={true} />
    }
    else if ((status === 'ready' && data === undefined) || !data) {
        content = <Box> Something wrong - missing information.</Box>
    }
    else if (status === 'failed') {
        content = <Box>{error}</Box>
    }
    else if (status === 'ready' && data) {
        content = <CoursesForm data={data} addItem={addItem} removeItem={removeItem} onChangeHandler={onChangeHandler} hidingClickHandler={hidingClickHandler} />
    }

    useEffect(() => {
        if (status === 'idle' && userLogged) {
            dispatch(getCourses(userLogged));
        }
    }, [status, userLogged, dispatch])
    return (
        <>
            {content}
        </>
    );
};

export default Courses;

const CoursesForm = ({ data, addItem, removeItem, onChangeHandler, hidingClickHandler }) => {
    return (
        <SectionWrapper sectionTitle={'Courses'} flexDirect='column' isHiding={true} hidingClickHandler={hidingClickHandler} >
            <Accordion allowToggle allowMultiple={false}>

                {
                    data.map((elem, index) => {
                        return (

                            <AccordionElem index={index} key={`course_${index}`} title={elem.course} removeItem={(e) => removeItem(e, data[index])}>
                                <SimpleGrid columns={[1, 1, 2]} alignItems={'center'} justifyContent={'center'} spacing={[5, 3]}>
                                    <DashboardInput labelText={'Course'} name={'course'} inputValue={elem.course} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />
                                    <DashboardInput labelText={'Institution'} name={'institution'} inputValue={elem.institution} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />
                                    <DashboardInput labelText={'Start-End Date'} name={'period'} inputValue={elem.period} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />
                                    <DashboardInput labelText={'Link To Certificate'} name={'cert'} inputValue={elem.cert} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />
                                </SimpleGrid>
                            </AccordionElem>
                        )
                    })
                }
                <Box>
                    {
                        data.length > 0
                            ? <AddMoreItemBtn itemType={'course'} onClickCallback={addItem} oneMore />
                            : <AddMoreItemBtn itemType={'course'} onClickCallback={addItem} />
                    }
                </Box>
            </Accordion>
        </SectionWrapper>
    )
}
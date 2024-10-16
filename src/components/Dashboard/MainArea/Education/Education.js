import { useEffect } from 'react';
import { Box, SimpleGrid, Accordion } from '@chakra-ui/react';

import { useSelector, useDispatch } from 'react-redux';
import { addEducationItem, getEducation, inputEducationUpdate, removeEducationItem } from '@/redux/features/education/educationSlice';
import { setIsModifiedContent } from '@/redux/features/utility/utilitySlice';

import { eductionData } from '@/lib/content-lib';
import SectionDescription from '../SectionDescription';
import SectionWrapper from '../SectionsWrapper';
import LoadingSectionSkeleton from '@/components/Loaders/LoadingSectionSkeleton';
import AccordionElem from '@/components/Accordion/AccordionElem';
import TextEditor from '@/components/FormItems/TextEditor/TextEditor';
import DashboardInput from '@/components/FormItems/DashboardInputs/DashboardInput';
import AddMoreItemBtn from '@/components/AddMoreItemBtn/AddMoreItemBtn';
const Education = ({ userLogged }) => {

    const dispatch = useDispatch();
    const data = useSelector(state => state.education.data);
    const status = useSelector(state => state.education.status);
    const error = useSelector(state => state.education.error);
    const isSectionVisible = useSelector(state => state.education.__serv.isSectionVisible);

    let content;


    const onChangeHandler = (index, name, value,) => {
        dispatch(inputEducationUpdate({ arrayIndex: index, inputName: name, value: value }));
        dispatch(setIsModifiedContent({ status: true, section: 'education' }));
    }

    const addItem = () => {
        dispatch(addEducationItem());
    }

    const removeItem = (e, itemToRemove) => {
        e.preventDefault();
        let indexToRemove = data.findIndex((elem) => elem === itemToRemove);
        dispatch(removeEducationItem(indexToRemove));
        dispatch(setIsModifiedContent({ status: true, section: 'education' }));
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
    else if (status === 'ready') {
        content = isSectionVisible &&
            <>
                <EducationForm data={data} onChangeHandler={onChangeHandler} removeItem={removeItem} addItem={addItem} />
            </>
    }


    useEffect(() => {
        if (status === 'idle' && userLogged) {
            dispatch(getEducation(userLogged));
        }
    }, [status, userLogged, dispatch])
    return (
        <>
            {content}
        </>
    );
};

export default Education;

const EducationForm = ({ data, removeItem, addItem, onChangeHandler }) => {

    return (
        <SectionWrapper sectionTitle={'Education'} flexDirect='column'>

            <SectionDescription value={eductionData.sectionDescription || `Earum exercitationem commodi culpa, temporibus blanditiis adipisci optio, ad architecto vero debitis voluptas!`} />

            <Accordion allowToggle allowMultiple={false}>
                {
                    data
                    && data.map((elem, index) => {
                        return (
                            <AccordionElem index={index} key={`education_${index}`} title={elem.institution} removeItem={(e) => removeItem(e, data[index])}>

                                <SimpleGrid columns={[1, 1, 2]} alignItems={'center'} justifyContent={'center'} spacing={3}>
                                    <DashboardInput labelText='Institution' name={'institution'} inputValue={elem.institution} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />
                                    <DashboardInput labelText='Degree' name={'degree'} inputValue={elem.degree} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />
                                    <DashboardInput labelText='Start-End Date' name={'period'} inputValue={elem.period} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />
                                    <DashboardInput labelText='City/Country' name={'location'} inputValue={elem.location} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />

                                </SimpleGrid>
                                <Box marginTop={3}>
                                    <TextEditor state={{ value: elem.comments }} onChangeCallback={(value) => onChangeHandler(index, 'comments', value)} />
                                </Box>
                            </AccordionElem>
                        )
                    })
                }
                <Box>
                    {
                        data.length > 0
                            ? <AddMoreItemBtn itemType={'education'} onClickCallback={addItem} oneMore />
                            : <AddMoreItemBtn itemType={'education'} onClickCallback={addItem} />
                    }

                </Box>
            </Accordion>

        </SectionWrapper>
    )
}

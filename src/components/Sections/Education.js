import React, { useEffect } from "react";
import { Box, SimpleGrid, Accordion } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { addEducationItem, getEducation, inputEducationUpdate, removeEducationItem } from "../../redux/features/education/educationSlice";
import { setIsModifiedContent } from "../../redux/features/utility/utilitySlice";

import AccordionElem from "../Accordion/AccordionElem";
import InputCustom from "../FormElements/InputCustom";
import TextEditor from "../FormElements/TextEditor/TextEditor";
import LoadingSectionSkeleton from "../Progress/LoadingSectionSkeleton";
import SectionWrapper from "../Wrappers/SectionWrapper";
import SectionDescription from "./SectionDescription";
import AddMoreItemBtn from "../AddMoreItemBtn/AddMoreItemBtn";

const Education = ({ loggedUser }) => {
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
    else if (status === 'ready' && data) {
        content = isSectionVisible &&
            <EducationForm data={data} onChangeHandler={onChangeHandler} removeItem={removeItem} addItem={addItem} />
    }

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getEducation(loggedUser));
        }
    }, [status, loggedUser, dispatch])

    return (
        <>
            {content}
        </>
    )
}
export default Education;


const EducationForm = ({ data, removeItem, addItem, onChangeHandler }) => {
    return (
        <SectionWrapper sectionTitle={'Education'} flexDirect='column'>
            <SectionDescription value={"A varied education on your resume sums up the value that your learnings and background will bring to job."} />

            <Accordion allowToggle allowMultiple={false}>
                {
                    data.map((elem, index) => {
                        return (
                            <AccordionElem index={index} key={`education_${index}`} title={elem.institution} removeItem={(e) => removeItem(e, data[index])}>

                                <SimpleGrid columns={[1, 1, 2]} alignItems={'center'} justifyContent={'center'}>

                                    <InputCustom labelText={'Institution'} name={'institution'} inputValue={elem.institution} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />
                                    <InputCustom labelText={'Degree'} name={'degree'} inputValue={elem.degree} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />
                                    <InputCustom labelText={'Start-End Date'} name={'period'} inputValue={elem.period} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />
                                    <InputCustom labelText={'City/Country'} name={'location'} inputValue={elem.location} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />

                                </SimpleGrid>
                                <Box>
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
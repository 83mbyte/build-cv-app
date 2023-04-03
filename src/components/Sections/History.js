import { Accordion, Box, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addHistoryItem, getHistory, inputHistoryUpdate, removeHistoryItem } from '../../redux/features/history/historySlice';
import { setIsModifiedContent } from '../../redux/features/utility/utilitySlice';
import AccordionElem from '../Accordion/AccordionElem';
import AddMoreItemBtn from '../AddMoreItemBtn/AddMoreItemBtn';
import InputCustom from '../FormElements/InputCustom';
import TextEditor from '../FormElements/TextEditor/TextEditor';
import LoadingSectionSkeleton from '../Progress/LoadingSectionSkeleton';
import SectionWrapper from '../Wrappers/SectionWrapper';
import SectionDescription from './SectionDescription';

const History = ({ loggedUser }) => {
    let content;
    let dispatch = useDispatch();
    const data = useSelector(state => state.history.data);
    const status = useSelector(state => state.history.status);
    const error = useSelector(state => state.history.error);
    const isSectionVisible = useSelector(state => state.history.__serv.isSectionVisible);

    const addItem = () => {
        dispatch(addHistoryItem())
    }
    const removeItem = (e, itemToRemove) => {
        e.preventDefault();
        let indexToRemove = data.findIndex((elem) => elem === itemToRemove);
        dispatch(removeHistoryItem(indexToRemove));
        dispatch(setIsModifiedContent({ status: true, section: 'history' }));
    }

    const onChangeHandler = (index, name, value,) => {
        dispatch(inputHistoryUpdate({ arrayIndex: index, inputName: name, value: value }));
        dispatch(setIsModifiedContent({ status: true, section: 'history' }));
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
            // <EducationForm data={data} onChangeHandler={onChangeHandler} removeItem={removeItem} addItem={addItem} />
            <HistoryForm data={data} addItem={addItem} removeItem={removeItem} onChangeHandler={onChangeHandler} />
    }

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getHistory(loggedUser))
        }
    }, [status, dispatch, loggedUser])

    return (
        <>
            {content}
        </>
    );
};

export default History;

const HistoryForm = ({ data, addItem, removeItem, onChangeHandler }) => {
    return (
        <SectionWrapper sectionTitle={'Employment History'} flexDirect='column'>
            <SectionDescription value={'Show your relevant experience (last 10 years). Use bullet points to note your achievements, if possible - use numbers/facts (Achieved X, measured by Y, by doing Z).'} />
            <Accordion allowToggle allowMultiple={false}>
                {
                    data.map((elem, index) => {
                        return (

                            <AccordionElem index={index} key={`history_${index}`} title={`${elem.job}`} descr={elem.employer} removeItem={(e) => removeItem(e, data[index])}>

                                <SimpleGrid columns={[1, 1, 2]} alignItems={'center'} justifyContent={'center'}>

                                    <InputCustom labelText={'Job Title'} name={'job'} inputValue={elem.job} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />
                                    <InputCustom labelText={'Employer'} name={'employer'} inputValue={elem.employer} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />
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
            </Accordion>
            <Box>
                <AddMoreItemBtn itemType='employment' onClickCallback={addItem} />
            </Box>
        </SectionWrapper>
    )
}
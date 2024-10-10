

import { useEffect } from 'react';
import { Accordion, Box, SimpleGrid } from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { addHistoryItem, getHistory, inputHistoryUpdate, removeHistoryItem } from '@/redux/features/history/historySlice';
import { setIsModifiedContent } from '@/redux/features/utility/utilitySlice';

import { historyData } from '@/lib/content-lib';

import SectionWrapper from '../SectionsWrapper';
import SectionDescription from '../SectionDescription';
import LoadingSectionSkeleton from '@/components/Loaders/LoadingSectionSkeleton';
import AccordionElem from '@/components/Accordion/AccordionElem';
import AddMoreItemBtn from '@/components/AddMoreItemBtn/AddMoreItemBtn';
import TextEditor from '@/components/FormItems/TextEditor/TextEditor';
import DashboardInput from '@/components/FormItems/DashboardInputs/DashboardInput';

const History = ({ userLogged }) => {
    let content;

    const dispatch = useDispatch();

    const status = useSelector(state => state.history.status);
    const data = useSelector(state => state.history.data);
    const error = useSelector(state => state.history.error);
    const isSectionVisible = useSelector(state => state.history.__serv.isSectionVisible);

    const addItem = () => {
        dispatch(addHistoryItem())
    };

    const removeItem = (e, itemToRemove) => {
        e.preventDefault();
        let indexToRemove = data.findIndex((elem) => elem === itemToRemove);
        dispatch(removeHistoryItem(indexToRemove));
        dispatch(setIsModifiedContent({ status: true, section: 'history' }));
    };


    const onChangeHandler = (index, name, value,) => {
        dispatch(inputHistoryUpdate({ arrayIndex: index, inputName: name, value: value }));
        dispatch(setIsModifiedContent({ status: true, section: 'history' }));
    };

    // choose content to render
    if (status === 'loading') {
        content = <LoadingSectionSkeleton rowsNumber={0} textArea={true} />
    }
    else if ((status === 'ready' && data === undefined) || !data) {
        content = <Box>Something wrong - History data is missed.</Box>
    }
    else if (status === 'failed') {
        content = <Box>{error}</Box>
    }
    else if (status === 'ready' && data) {
        content = isSectionVisible &&
            <HistoryForm data={data} addItem={addItem} removeItem={removeItem} onChangeHandler={onChangeHandler} />
    }



    useEffect(() => {
        if (status === 'idle') {
            dispatch(getHistory(userLogged));
        }
    }, [status, dispatch, userLogged])

    return (
        <>
            {
                isSectionVisible &&
                <SectionWrapper sectionTitle={'Employment History'} flexDirect='column'>
                    <SectionDescription value={historyData.sectionDescription || `Earum exercitationem commodi culpa, temporibus blanditiis adipisci optio, ad architecto vero debitis voluptas!`} />
                    <>
                        {content}
                    </>
                </SectionWrapper>
            }
        </>
    );
};

export default History;

const HistoryForm = ({ data, addItem, removeItem, onChangeHandler }) => {

    return (
        <>

            <Accordion allowToggle allowMultiple={false}>
                {
                    data.map((elem, index) => {
                        return (

                            <AccordionElem index={index} key={`history_${index}`} title={`${elem.job}`} descr={elem.employer} removeItem={(e) => removeItem(e, data[index])}>

                                <SimpleGrid columns={[1, 1, 2]} alignItems={'center'} justifyContent={'center'} spacing={3}>

                                    <DashboardInput labelText={'Job Title'} name={'job'} inputValue={elem.job} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />
                                    <DashboardInput labelText={'Employer'} name={'employer'} inputValue={elem.employer} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />
                                    <DashboardInput labelText={'Start-End Date'} name={'period'} inputValue={elem.period} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />
                                    <DashboardInput labelText={'City/Country'} name={'location'} inputValue={elem.location} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />

                                </SimpleGrid>
                                <Box marginTop={3}>
                                    <TextEditor state={{ value: elem.comments }} onChangeCallback={(value) => onChangeHandler(index, 'comments', value)} />
                                </Box>

                            </AccordionElem>
                        )
                    })
                }
            </Accordion>
            <Box>
                {
                    data.length > 0
                        ? <AddMoreItemBtn itemType={'employment'} onClickCallback={addItem} oneMore />
                        : <AddMoreItemBtn itemType={'employment'} onClickCallback={addItem} />
                }
            </Box>
        </>
    )
}
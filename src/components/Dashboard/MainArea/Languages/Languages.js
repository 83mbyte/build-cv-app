import { useEffect } from 'react';
import { Box, Accordion, SimpleGrid } from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { putAdditionalSectionsOnServerThunk, setIsModifiedContent } from '@/redux/features/utility/utilitySlice';
import { addLanguagesItem, getLanguages, inputLanguagesUpdate, removeLanguagesItem } from '@/redux/features/languages/languagesSlice';

import SectionWrapper from '../SectionsWrapper';
import LoadingSectionSkeleton from '@/components/Loaders/LoadingSectionSkeleton';
import DashboardInput from '@/components/FormItems/DashboardInputs/DashboardInput';
import AccordionElem from '@/components/Accordion/AccordionElem';
import SelectCustom from '@/components/FormItems/SelectCustom';
import AddMoreItemBtn from '@/components/AddMoreItemBtn/AddMoreItemBtn';

const Languages = ({ userLogged }) => {
    let content;
    const dispatch = useDispatch();
    const data = useSelector(state => state.languages.data);
    const status = useSelector(state => state.languages.status);
    const error = useSelector(state => state.languages.error);
    const additionalSections = useSelector(state => state.utility.additionalSections.data);

    const hidingClickHandler = () => {
        let index = additionalSections.indexOf('languages');
        let tmp = [...additionalSections];
        tmp.splice(index, 1);
        dispatch(putAdditionalSectionsOnServerThunk({
            user: userLogged.userId,
            token: userLogged.accessToken,
            data: tmp
        }))
    }

    const removeItem = (e, itemToRemove) => {
        e.preventDefault();
        let indexToRemove = data.findIndex((elem) => elem === itemToRemove);
        dispatch(removeLanguagesItem(indexToRemove));
        dispatch(setIsModifiedContent({ status: true, section: 'languages' }));
    }
    const addItem = () => {
        dispatch(addLanguagesItem());
    }

    const onChangeHandler = (index, name, value,) => {
        dispatch(inputLanguagesUpdate({ arrayIndex: index, inputName: name, value: value }));
        dispatch(setIsModifiedContent({ status: true, section: 'languages' }));
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
        content = <LanguagesForm data={data} removeItem={removeItem} addItem={addItem} onChangeHandler={onChangeHandler} hidingClickHandler={hidingClickHandler} />
    }

    useEffect(() => {
        if (status === 'idle' && userLogged) {
            dispatch(getLanguages(userLogged));

        }
    }, [status, userLogged, dispatch])
    return (
        <>
            {content}
        </>
    );
};

export default Languages;


const LanguagesForm = ({ data, removeItem, addItem, onChangeHandler, hidingClickHandler }) => {

    const itemsArray = ['Native speaker', 'Highly proficient', 'Very good command', 'Good working knowledge', 'Working knowledge', 'C2', 'C1', 'B2', 'B1', 'A2', 'A1'];

    return (
        <SectionWrapper sectionTitle={'Languages'} flexDirect='column' isHiding={true} hidingClickHandler={hidingClickHandler}>
            <Accordion allowToggle allowMultiple={false}>
                {
                    data.map((elem, index) => {
                        return (
                            <AccordionElem key={`language_${index}`} title={elem.language} removeItem={(e) => removeItem(e, data[index])}>
                                <SimpleGrid columns={[1, 1, 2]} alignItems={'center'} justifyContent={'center'} spacing={[5, 3]}>
                                    <DashboardInput labelText={'Language'} name={'language'} inputValue={elem.language} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />

                                    <SelectCustom value={elem.level} itemsArray={itemsArray} onChangeCallback={(value) => onChangeHandler(index, 'level', value)} />
                                </SimpleGrid >
                            </AccordionElem>
                        )
                    })
                }
            </Accordion>
            <Box>
                {
                    data.length > 0
                        ? <AddMoreItemBtn itemType={'language'} onClickCallback={addItem} oneMore />
                        : <AddMoreItemBtn itemType={'language'} onClickCallback={addItem} />
                }
            </Box>
        </SectionWrapper>
    )
}
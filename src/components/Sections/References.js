import React, { useEffect } from 'react';

import { Accordion, Box, SimpleGrid } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { addReferencesItem, getReferences, inputReferencesUpdate, removeReferencesItem, toggleReferencesSwitch } from '../../redux/features/references/referencesSlice';
import { setIsModifiedContent } from '../../redux/features/utility/utilitySlice';

import LoadingSectionSkeleton from '../Progress/LoadingSectionSkeleton';
import SectionWrapper from '../Wrappers/SectionWrapper';
import SwitchCustom from '../Switch/SwitchCustom';
import AddMoreItemBtn from '../AddMoreItemBtn/AddMoreItemBtn';
import AccordionElem from '../Accordion/AccordionElem';
import InputCustom from '../FormElements/InputCustom';


const References = ({ loggedUser }) => {
    let content;
    const dispatch = useDispatch();

    const data = useSelector(state => state.references.data);
    const status = useSelector(state => state.references.status);
    const error = useSelector(state => state.references.error);
    const isSectionVisible = useSelector(state => state.references.__serv.isSectionVisible);
    const isSwitchChecked = useSelector(state => state.references.__serv.isSwitchChecked);

    const addItem = () => {
        dispatch(addReferencesItem());
    }
    const removeItem = (e, itemToRemove) => {
        e.preventDefault();
        let indexToRemove = data.findIndex((elem) => elem === itemToRemove);
        dispatch(removeReferencesItem(indexToRemove))
        dispatch(setIsModifiedContent({ status: true, section: 'references' }));
    }
    const toggleSwitch = () => {
        dispatch(toggleReferencesSwitch());
        dispatch(setIsModifiedContent({ status: true, section: 'references' }));
    }
    const onChangeHandler = (index, name, value,) => {
        dispatch(inputReferencesUpdate({ arrayIndex: index, inputName: name, value: value }));
        dispatch(setIsModifiedContent({ status: true, section: 'references' }));
    }

    if (status === 'loading') {
        content = <LoadingSectionSkeleton rowsNumber={0} textArea={true} />
    }
    else if (status === 'ready' && (data === undefined || !data)) {
        content = <Box>Something wrong - missed data.</Box>
    }
    else if (status === 'failed') {
        content = <Box>{error}</Box>
    }
    else if (status === 'ready' && data) {
        content = isSectionVisible &&
            <ReferecesForm data={data} isSwitchChecked={isSwitchChecked} addItem={addItem} removeItem={removeItem} toggleSwitch={toggleSwitch} onChangeHandler={onChangeHandler} />
    }

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getReferences(loggedUser));
        }
    }, [status, loggedUser, dispatch])
    return (
        <>
            {content}
        </>
    );
};

export default References;

const ReferecesForm = ({ data, addItem, isSwitchChecked, toggleSwitch, removeItem, onChangeHandler }) => {
    return (
        <SectionWrapper sectionTitle={'References'} flexDirect='column'>
            <Box my={2} mb={5} w={'100%'} px='0' minW={'200px'}  >
                <SwitchCustom
                    size={'sm'}
                    labelText={`I'd like to hide references and make them available only upon request`}
                    isChecked={isSwitchChecked}
                    toggleSwitch={toggleSwitch}
                />
            </Box>
            <Accordion allowToggle allowMultiple={false}>
                {
                    data.map((elem, index) => {
                        return (
                            <AccordionElem key={`reference_${index}`} title={elem.name} descr={elem.company} removeItem={(e) => removeItem(e, data[index])}>

                                <SimpleGrid columns={[1, 1, 2]} alignItems={'center'} justifyContent={'center'}>

                                    <InputCustom labelText={`Referent's Full Name`} name={'name'} inputValue={elem.name} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />
                                    <InputCustom labelText={`Company`} name={'company'} inputValue={elem.company} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />
                                    <InputCustom labelText={`Phone`} name={'phone'} inputValue={elem.phone} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />
                                    <InputCustom labelText={`Email`} name={'email'} inputValue={elem.email} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />
                                </SimpleGrid>
                            </AccordionElem>
                        )
                    })
                }
            </Accordion>
            <Box>
                <AddMoreItemBtn itemType='reference' onClickCallback={addItem} />
            </Box>


        </SectionWrapper>
    )
}
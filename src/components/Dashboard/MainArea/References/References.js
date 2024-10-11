import { useEffect } from 'react';
import { Accordion, Box, SimpleGrid } from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { addReferencesItem, getReferences, inputReferencesUpdate, removeReferencesItem, toggleReferencesSwitch } from '@/redux/features/references/referencesSlice';
import { putAdditionalSectionsOnServerThunk, setIsModifiedContent } from '@/redux/features/utility/utilitySlice';

import LoadingSectionSkeleton from '@/components/Loaders/LoadingSectionSkeleton';
import SectionWrapper from '../SectionsWrapper';
import AccordionElem from '@/components/Accordion/AccordionElem';
import SwitchCustom from '@/components/Switch/SwitchCustom';
import DashboardInput from '@/components/FormItems/DashboardInputs/DashboardInput';
import AddMoreItemBtn from '@/components/AddMoreItemBtn/AddMoreItemBtn';


const References = ({ userLogged }) => {
    let content = null;

    const dispatch = useDispatch();

    const data = useSelector(state => state.references.data);
    const status = useSelector(state => state.references.status);
    const error = useSelector(state => state.references.error);
    const isSwitchChecked = useSelector(state => state.references.__serv.isSwitchChecked);
    const additionalSections = useSelector(state => state.utility.additionalSections.data);

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
    const hidingClickHandler = () => {
        let index = additionalSections.indexOf('references');
        let tmp = [...additionalSections];
        tmp.splice(index, 1);
        dispatch(putAdditionalSectionsOnServerThunk({
            user: userLogged.userId,
            token: userLogged.accessToken,
            data: tmp
        }))
    }

    // content to show

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
        content = <ReferecesForm data={data} isSwitchChecked={isSwitchChecked} addItem={addItem} removeItem={removeItem} toggleSwitch={toggleSwitch} onChangeHandler={onChangeHandler} hidingClickHandler={hidingClickHandler} />
    }


    useEffect(() => {
        if (status === 'idle' && userLogged) {
            dispatch(getReferences(userLogged));
        }
    }, [status, userLogged, dispatch])
    return (
        <>
            {content}
        </>
    );
};

export default References;

const ReferecesForm = ({ data, addItem, isSwitchChecked, toggleSwitch, removeItem, onChangeHandler, hidingClickHandler }) => {
    return (

        <SectionWrapper sectionTitle={'References'} flexDirect='column' isHiding={true} hidingClickHandler={hidingClickHandler}>
            {
                data.length > 0 &&
                <Box my={2} mb={5} w={'100%'} px='0' minW={'200px'}  >
                    <SwitchCustom
                        size={'sm'}
                        labelText={`I'd like to hide references and make them available only upon request`}
                        isChecked={isSwitchChecked}
                        toggleSwitch={toggleSwitch}
                    />
                </Box>
            }
            <Accordion allowToggle allowMultiple={false}>
                {
                    data.map((elem, index) => {
                        return (
                            <AccordionElem key={`reference_${index}`} title={elem.name} descr={elem.company} removeItem={(e) => removeItem(e, data[index])}>

                                <SimpleGrid columns={[1, 1, 2]} alignItems={'center'} justifyContent={'center'} spacing={3}>

                                    <DashboardInput labelText={`Referent's Full Name`} name={'name'} inputValue={elem.name} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />
                                    <DashboardInput labelText={`Company`} name={'company'} inputValue={elem.company} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />
                                    <DashboardInput labelText={`Phone`} name={'phone'} inputValue={elem.phone} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />
                                    <DashboardInput labelText={`Email`} name={'email'} inputValue={elem.email} onChangeCallback={(name, value) => onChangeHandler(index, name, value)} />
                                </SimpleGrid>
                            </AccordionElem>
                        )
                    })
                }
            </Accordion>

            <Box>
                {
                    data.length > 0
                        ? <AddMoreItemBtn itemType={'reference'} onClickCallback={addItem} oneMore />
                        : <AddMoreItemBtn itemType={'reference'} onClickCallback={addItem} />
                }
            </Box>


        </SectionWrapper>
    )
}
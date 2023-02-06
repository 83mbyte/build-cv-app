import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccordionContainer from '../components/Accordion/AccordionContainer';
import Switcher from '../components/FormElements/Switcher';
import SpinnerCustom from '../components/Spinner/SpinnerCustom';
import { addNewReferencesItem, fetchReferences, referencesStateValueUpdate, referenceSwitchToggle, removeReferencesItem } from '../redux/features/references/referencesSlice';
import SectionContainer from './SectionContainer';

const References = ({ title, user }) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.references.data);
    const stateStatus = useSelector(state => state.references.status);
    const error = useSelector(state => state.references.error);
    const isSwitchChecked = useSelector(state => state.references.isSwitchChecked);

    let content;

    if (stateStatus === 'loading') {
        content = <SpinnerCustom />
    } else if ((stateStatus === 'succeeded' && data === undefined) || !data) {
        content = <Box>Something wrong - missed data.</Box>
    }
    else if (stateStatus === 'failed') {
        content = <Box>{error}</Box>
    }
    else if (stateStatus === 'succeeded' && data) {

        content = <AccordionContainer
            state={data}
            sectionName={'references'}
            addOneMoreValue={'reference'}
            inputsOrder={['referentName', 'company', 'phone', 'email']}
            removeItemAction={removeReferencesItem}
            addNewItemAction={addNewReferencesItem}
            valueUpdateAction={referencesStateValueUpdate}
        />
    }


    useEffect(() => {
        if (stateStatus === 'idle') {
            dispatch(fetchReferences(user))
        }
    }, [stateStatus, user, dispatch])

    return (
        <div>
            <SectionContainer headingTxt={title} type='flex' flexDirect='column'>
                <Box mt={5} mb={0} w={'100%'} px='10px' minW={'200px'}  >
                    <Switcher
                        labelText={`I'd like to hide references and make them available only upon request`}
                        switchId={'references-switch'}
                        size={'sm'}
                        isChecked={isSwitchChecked}
                        toggleSwitchAction={referenceSwitchToggle}
                    />
                </Box>

                {
                    content
                }

            </SectionContainer>
        </div>
    );
};

export default References;
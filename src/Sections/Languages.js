import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccordionContainer from '../components/Accordion/AccordionContainer';

import SpinnerCustom from '../components/Spinner/SpinnerCustom';
import { addNewLanguagesItem, fetchLanguages, languagesStateValueUpdate, removeLanguagesItem } from '../redux/features/languages/languagesSlice';
import SectionContainer from './SectionContainer';

const Languages = ({ title, user }) => {
    const dispatch = useDispatch();
    const stateStatus = useSelector(state => state.languages.status);
    const data = useSelector(state => state.languages.data);
    const error = useSelector(state => state.languages.error);


    let content;
    if (stateStatus === 'idle') {
        content = <SpinnerCustom />
    } else if ((stateStatus === 'succeeded' && data === undefined) || !data) {
        content = <Box>Something wrong - missed data.</Box>
    }
    else if (stateStatus === 'failed') {
        content = <Box>{error}</Box>
    }
    else if (stateStatus === 'succeeded' && data) {

        content = <AccordionContainer
            inputsOrder={['language', 'level']}
            state={data}
            sectionName={'languages'}
            addOneMoreValue={'language'}
            removeItemAction={removeLanguagesItem}
            addNewItemAction={addNewLanguagesItem}
            valueUpdateAction={languagesStateValueUpdate}
        />
    }

    useEffect(() => {
        if (stateStatus == 'idle') {
            dispatch(fetchLanguages(user));
        }
    }, [stateStatus, user, dispatch]);

    return (
        <SectionContainer headingTxt={title} type='flex' flexDirect={'column'}>

            {content}

        </SectionContainer>
    );
};

export default Languages;
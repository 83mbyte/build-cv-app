import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccordionContainer from '../components/Accordion/AccordionContainer';
import SpinnerCustom from '../components/Spinner/SpinnerCustom';
import { fetchWebSocLinks, addNewWebSocLinksItem, removeWebSocLinksItem, websoclinksStateValueUpdate } from '../redux/features/websoclinks/websoclinksSlice';
import SectionContainer from './SectionContainer';
import SectionDescription from './SectionDescription';

const WebSocLinks = ({ title, user }) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.websoclinks.data);
    const stateStatus = useSelector(state => state.websoclinks.status);
    const error = useSelector(state => state.websoclinks.error);

    let content;
    if (stateStatus === 'loading') {
        content = <SpinnerCustom />
    }
    else if ((stateStatus === 'succeeded' && data === undefined) || !data) {
        content = <Box>Something wrong - missed data.</Box>
    }
    else if (stateStatus === 'failed') {
        content = <Box>{error}</Box>
    }
    else if (stateStatus === 'succeeded' && data) {

        content = <AccordionContainer
            state={data}

            sectionName={'websoclinks'}
            addOneMoreValue={'links'}
            inputsOrder={['label', 'link']}
            removeItemAction={removeWebSocLinksItem}
            addNewItemAction={addNewWebSocLinksItem}
            valueUpdateAction={websoclinksStateValueUpdate}
        />
    }

    useEffect(() => {
        if (stateStatus === 'idle') {
            dispatch(fetchWebSocLinks(user))
        }
    }, [stateStatus, dispatch, user]);

    return (
        <SectionContainer headingTxt={title} type="flex" flexDirect='column'>
            <SectionDescription value={"You can add links to websites you want hiring managers to see! Perhaps It will be a link to your portfolio, LinkedIn profile, or personal website."} />

            {content}
        </SectionContainer>


    );
};

export default WebSocLinks;
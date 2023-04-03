
import React, { useEffect } from 'react';

import { Accordion, Box, SimpleGrid } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import LoadingSectionSkeleton from '../Progress/LoadingSectionSkeleton';
import SectionWrapper from '../Wrappers/SectionWrapper';
import SectionDescription from './SectionDescription';
import { addLinksItem, getLinks, inputLinksUpdate, removeLinksItem } from '../../redux/features/links/linksSlice';
import AccordionElem from '../Accordion/AccordionElem';
import InputCustom from '../FormElements/InputCustom';
import { setIsModifiedContent } from '../../redux/features/utility/utilitySlice';
import AddMoreItemBtn from '../AddMoreItemBtn/AddMoreItemBtn';
import ProposedItems from '../ProposedItems/ProposedItems';

const Links = ({ loggedUser }) => {
    const predefined = [
        { "label": "Facebook", "link": "https://www.facebook.com/" },
        { "label": "Twitter", "link": "https://twitter.com/" },
        { "label": "GitHub", "link": "https://github.com/" },
        { "label": "Linkedin", "link": "https://www.linkedin.com/" },

    ]

    const dispatch = useDispatch();

    const data = useSelector(state => state.links.data);
    const status = useSelector(state => state.links.status);
    const error = useSelector(state => state.links.error);
    const isSectionVisible = useSelector(state => state.links.__serv.isSectionVisible);
    const onChangeHandler = (index, name, value,) => {
        dispatch(inputLinksUpdate({ arrayIndex: index, inputName: name, value: value }));
        dispatch(setIsModifiedContent({ status: true, section: 'links' }));
    }
    const removeItem = (e, itemToRemove) => {
        e.preventDefault();
        let indexToRemove = data.findIndex((elem) => elem === itemToRemove);
        dispatch(removeLinksItem(indexToRemove));
        dispatch(setIsModifiedContent({ status: true, section: 'links' }));
    }
    const addItem = (data = null) => {
        if (!data) {
            dispatch(addLinksItem())
        } else {
            dispatch(addLinksItem(data))
        }
    }

    let content;
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
            <SectionWrapper sectionTitle={'Websites & Social Links'} flexDirect='column'>
                <SectionDescription value={"You can add links to websites you want hiring managers to see! Perhaps It will be a link to your portfolio, LinkedIn profile, or personal website."} />

                {
                    predefined.length > 0 &&
                    <ProposedItems onClickCallback={addItem} predefined={predefined} sectionName={'links'} />
                }

                <Accordion allowToggle allowMultiple={false}>
                    {
                        data.map((elem, index) => {
                            return (
                                <AccordionElem key={`link_${index}`} title={elem.label} descr={elem.link} removeItem={(e) => removeItem(e, data[index])}>
                                    <SimpleGrid columns={[1, 1, 2]} alignItems={'center'} justifyContent={'center'}>

                                        <InputCustom
                                            labelText={'Label'}
                                            name={'label'}
                                            inputValue={elem.label}
                                            onChangeCallback={(name, value) => onChangeHandler(index, name, value)}
                                        />
                                        <InputCustom
                                            labelText={'Link'}
                                            name={'link'}
                                            inputValue={elem.link}
                                            onChangeCallback={(name, value) => onChangeHandler(index, name, value)}
                                        />
                                    </SimpleGrid>
                                </AccordionElem>
                            )
                        })
                    }
                    <Box>
                        <AddMoreItemBtn itemType={'link'} onClickCallback={addItem} />
                    </Box>
                </Accordion>
            </SectionWrapper >
    }

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getLinks(loggedUser));
        }
    }, [status, loggedUser, dispatch])

    return (
        <>
            {content}
        </>
    );
};

export default Links;
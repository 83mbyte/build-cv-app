import { useEffect } from 'react';
import { Accordion, Box, SimpleGrid } from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { addLinksItem, getLinks, inputLinksUpdate, removeLinksItem } from '@/redux/features/links/linksSlice';
import { setIsModifiedContent } from '@/redux/features/utility/utilitySlice';

import { linksData } from '@/lib/content-lib';

import SectionWrapper from '../SectionsWrapper';
import SectionDescription from '../SectionDescription';
import ProposedItems from '@/components/ProposedItems/ProposedItems';
import DashboardInput from '@/components/FormItems/DashboardInputs/DashboardInput';
import AccordionElem from '@/components/Accordion/AccordionElem';
import LoadingSectionSkeleton from '@/components/Loaders/LoadingSectionSkeleton';
import AddMoreItemBtn from '@/components/AddMoreItemBtn/AddMoreItemBtn';

const predefined = [
    { "label": "Facebook", "link": "https://www.facebook.com/" },
    { "label": "X", "link": "https://x.com/" },
    { "label": "GitHub", "link": "https://github.com/" },
    { "label": "LinkedIn", "link": "https://www.linkedin.com/" },

]

const Links = ({ userLogged }) => {
    let content;
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
        content = <LinksForm data={data} addItem={addItem} removeItem={removeItem} onChangeHandler={onChangeHandler} />
    }

    useEffect(() => {
        if (status === 'idle' && userLogged && isSectionVisible) {
            dispatch(getLinks(userLogged));

        }
    }, [status, userLogged, dispatch])
    return (
        <>
            {
                isSectionVisible &&
                <SectionWrapper sectionTitle={'Websites & Social Links'} flexDirect='column'>
                    <SectionDescription value={linksData?.sectionDescription || `Earum exercitationem commodi culpa, temporibus blanditiis adipisci optio, ad architecto vero debitis voluptas!`} />
                    {
                        predefined.length > 0 &&
                        <ProposedItems onClickCallback={addItem} predefined={predefined} sectionName={'links'} />
                    }
                    {content}
                </SectionWrapper>
            }
        </>
    );
};
export default Links;

const LinksForm = ({ data, addItem, removeItem, onChangeHandler }) => {
    return (
        <>
            <Accordion allowToggle allowMultiple={false}>
                {
                    data.map((elem, index) => {
                        return (
                            <AccordionElem key={`link_${index}`} title={elem.label} descr={elem.link} removeItem={(e) => removeItem(e, data[index])}>
                                <SimpleGrid columns={[1, 1, 2]} alignItems={'center'} justifyContent={'center'} spacing={[5, 3]}>

                                    <DashboardInput
                                        labelText={'Label'}
                                        name={'label'}
                                        inputValue={elem.label}
                                        onChangeCallback={(name, value) => onChangeHandler(index, name, value)}
                                    />
                                    <DashboardInput
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
                    {
                        data.length > 0
                            ? <AddMoreItemBtn itemType={'link'} onClickCallback={addItem} oneMore />
                            : <AddMoreItemBtn itemType={'link'} onClickCallback={addItem} />
                    }
                </Box>
            </Accordion>
        </>
    )
}
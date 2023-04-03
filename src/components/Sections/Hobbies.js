import React, { useEffect } from 'react';

import { Box } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsModifiedContent } from '../../redux/features/utility/utilitySlice';
import { getHobbies, inputHobbiesUpdate } from '../../redux/features/hobbies/hobbiesSlice';
import LoadingSectionSkeleton from '../Progress/LoadingSectionSkeleton';
import SectionWrapper from '../Wrappers/SectionWrapper';
import SectionDescription from './SectionDescription';
import TextEditor from '../FormElements/TextEditor/TextEditor';

const Hobbies = ({ loggedUser }) => {
    let content;
    const dispatch = useDispatch();

    const data = useSelector(state => state.hobbies.data);
    const status = useSelector(state => state.hobbies.status);
    const error = useSelector(state => state.hobbies.error);
    const isSectionVisible = useSelector(state => state.hobbies.__serv.isSectionVisible);

    const onChangeHandler = (data) => {
        dispatch(setIsModifiedContent({ status: true, section: 'hobbies' }));
        dispatch(inputHobbiesUpdate({ value: data }));
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
            <SectionWrapper sectionTitle={'Hobbies'} flexDirect={'column'} >
                <SectionDescription value={'What do you like?'} />
                <TextEditor state={data} onChangeCallback={onChangeHandler} />
            </SectionWrapper>
    }

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getHobbies(loggedUser));
        }
    }, [status, loggedUser, dispatch])

    return (
        <>
            {content}
        </>
    );
};

export default Hobbies;
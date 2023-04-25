import React, { useEffect } from 'react';

import { Box } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { putAdditionalSectionsOnServerThunk, setIsModifiedContent } from '../../redux/features/utility/utilitySlice';
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
    const additionalSections = useSelector(state => state.utility.additionalSections.data);

    const onChangeHandler = (data) => {
        dispatch(setIsModifiedContent({ status: true, section: 'hobbies' }));
        dispatch(inputHobbiesUpdate({ value: data }));
    }

    const hidingClickHandler = () => {
        let index = additionalSections.indexOf('hobbies');
        let tmp = [...additionalSections];
        tmp.splice(index, 1);
        dispatch(putAdditionalSectionsOnServerThunk({
            user: loggedUser.userId,
            token: loggedUser.accessToken,
            data: tmp
        }))
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
        content = <SectionWrapper sectionTitle={'Hobbies'} flexDirect={'column'} isHiding={true} hidingClickHandler={hidingClickHandler}>
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
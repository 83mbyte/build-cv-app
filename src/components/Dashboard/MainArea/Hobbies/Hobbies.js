import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getHobbies, inputHobbiesUpdate } from '@/redux/features/hobbies/hobbiesSlice';
import { putAdditionalSectionsOnServerThunk, setIsModifiedContent } from '@/redux/features/utility/utilitySlice';

import LoadingSectionSkeleton from '@/components/Loaders/LoadingSectionSkeleton';
import SectionWrapper from '../SectionsWrapper';
import SectionDescription from '../SectionDescription';
import TextEditor from '@/components/FormItems/TextEditor/TextEditor';

const Hobbies = ({ userLogged }) => {
    let content = null;

    const dispatch = useDispatch();
    const data = useSelector(state => state.hobbies.data);
    const status = useSelector(state => state.hobbies.status);
    const error = useSelector(state => state.hobbies.error);
    const additionalSections = useSelector(state => state.utility.additionalSections.data);

    // handlers
    const onChangeHandler = (data) => {

        dispatch(setIsModifiedContent({ status: true, section: 'hobbies' }));
        dispatch(inputHobbiesUpdate({ value: data }));
    }

    const hidingClickHandler = () => {
        let index = additionalSections.indexOf('hobbies');
        let tmp = [...additionalSections];
        tmp.splice(index, 1);
        dispatch(putAdditionalSectionsOnServerThunk({
            user: userLogged.userId,
            token: userLogged.accessToken,
            data: tmp
        }))
    }


    // content to render
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
        content =
            <TextEditor state={data} onChangeCallback={onChangeHandler} />
    }

    useEffect(() => {
        if (status === 'idle' && userLogged) {
            dispatch(getHobbies(userLogged));
        }
    }, [status, userLogged, dispatch])
    return (
        <>
            <SectionWrapper sectionTitle={'Hobbies'} flexDirect={'column'} isHiding={true} hidingClickHandler={hidingClickHandler}>
                <SectionDescription value={'What do you like?'} />
                {content}
            </SectionWrapper>
        </>
    );
};

export default Hobbies;
import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextAreaCustom from '../components/FormElements/TextAreaCustom';
import SpinnerCustom from '../components/Spinner/SpinnerCustom';
import { fetchHobbies, hobbiesStateValueUpdate } from '../redux/features/hobbies/hobbiesSlice';
import { setIsModifiedTrue } from '../redux/features/utility/utilitySlice';
import SectionContainer from './SectionContainer';

const Hobbies = ({ title, user }) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.hobbies.data);
    const stateStatus = useSelector(state => state.hobbies.status);
    const error = useSelector(state => state.hobbies.error);

    const handleInputChange = (value) => {
        //update state with a value 
        dispatch(hobbiesStateValueUpdate(value));
        dispatch(setIsModifiedTrue({ status: true, section: 'hobbies' }))
    }

    let content;
    if (stateStatus == 'loading') {
        content = <SpinnerCustom />
    }
    else if ((stateStatus === 'succeeded' && data === undefined) || !data) {
        content = <Box>Something wrong - missed data.</Box>
    }
    else if (stateStatus === 'failed') {
        content = <Box>{error}</Box>
    }
    else if (stateStatus === 'succeeded' && data) {
        content = <TextAreaCustom data={data} handleInputChange={handleInputChange} />
    }


    useEffect(() => {
        if (stateStatus == 'idle') {
            dispatch(fetchHobbies(user))
        }
    }, [stateStatus, user, dispatch])

    return (
        <SectionContainer headingTxt={title} type='flex' flexDirect='column'>
            {
                content
            }

        </SectionContainer >
    );
};

export default Hobbies;
import { Box } from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPersonDetails, inputUpdate } from '../../redux/features/personDetails/personDetailsSlice';
import { setIsModifiedContent } from '../../redux/features/utility/utilitySlice';
import InputCustom from '../FormElements/InputCustom';
import LoadingSectionSkeleton from '../Progress/LoadingSectionSkeleton';
import SectionWrapper from '../Wrappers/SectionWrapper';
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';

const PersonDetails = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.utility.auth.data);
    const data = useSelector(state => state.personDetails.data);
    const status = useSelector(state => state.personDetails.status);
    const error = useSelector(state => state.personDetails.error);
    const isSectionVisible = useSelector(state => state.personDetails.__serv.isSectionVisible);
    let content = null;
    const onChangeHandler = (name, value) => {
        dispatch(inputUpdate({ inputName: name, value: value }));
        dispatch(setIsModifiedContent({ status: true, section: 'personDetails' }));
    }
    if (status === 'ready' && data && data !== undefined) {
        content =
            isSectionVisible &&
            <SectionWrapper sectionTitle={'Personal Details'} type={'grid'}>
                <Box></Box>
                <Box display='flex' justifyContent={'flex-end'} px={2}>
                    <ProfilePhoto user={user} />
                </Box>
                <Box><InputCustom labelText='Job Title' name={'jobTitle'} inputValue={data.jobTitle} onChangeCallback={onChangeHandler} /></Box>
                <Box><InputCustom labelText='Email' required name={'email'} inputValue={data.email} onChangeCallback={onChangeHandler} /></Box>
                <Box>
                    <InputCustom labelText='First Name' required name={'firstName'} inputValue={data.firstName} onChangeCallback={onChangeHandler} />
                </Box>
                <Box><InputCustom labelText='Last Name' required name={'lastName'} inputValue={data.lastName} onChangeCallback={onChangeHandler} /></Box>
                <Box><InputCustom labelText='Phone' name={'phone'} inputValue={data.phone} onChangeCallback={onChangeHandler} /></Box>
                <Box><InputCustom labelText='Street' name={'street'} inputValue={data.street} onChangeCallback={onChangeHandler} /></Box>
                <Box><InputCustom labelText='City' name={'city'} inputValue={data.city} onChangeCallback={onChangeHandler} /></Box>
                <Box><InputCustom labelText='Country' name={'country'} inputValue={data.country} onChangeCallback={onChangeHandler} /></Box>
            </SectionWrapper>

    }
    else if (status === 'failed') {
        content = <Box p={'10px'}>Something wrong. {error}</Box>
    }
    else {
        content = <LoadingSectionSkeleton rowsNumber={4} />
    }
    useEffect(() => {
        if (status === 'idle') {
            dispatch(getPersonDetails(user));
        }
    }, [status, user, dispatch])
    return (
        <>
            {content}
        </>
    );
};

export default PersonDetails;
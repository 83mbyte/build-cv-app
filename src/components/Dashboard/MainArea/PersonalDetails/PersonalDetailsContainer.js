import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { getPersonDetailsThunk, inputUpdate } from '@/redux/features/personDetails/personDetailsSlice';
import { setIsModifiedContent } from '@/redux/features/utility/utilitySlice';

import DashboardInput from '@/components/FormItems/DashboardInputs/DashboardInput';
import SectionWrapper from '../SectionsWrapper';
import LoadingSectionSkeleton from '@/components/Loaders/LoadingSectionSkeleton';
import ProfilePhoto from '../../ProfilePhoto/ProfilePhoto';

const PersonalDetailsContainer = ({ userLogged }) => {

    const dispatch = useDispatch();
    const data = useSelector(state => state.personDetails.data);
    const status = useSelector(state => state.personDetails.status);
    const error = useSelector(state => state.personDetails.error);
    const isSectionVisible = useSelector(state => state.personDetails.__serv.isSectionVisible);

    const onChangeHandler = (name, value) => {
        dispatch(inputUpdate({ inputName: name, value: value }));
        dispatch(setIsModifiedContent({ status: true, section: 'personDetails' }));
    };

    let contentToShow = null;

    if (status == 'ready' && data) {

        contentToShow =
            isSectionVisible && <PersonDetailsForm data={data} onChangeHandler={onChangeHandler} userLogged={userLogged} />
    }
    else if (status === 'failed') {
        contentToShow = <Box p={'10px'}>Something wrong. {error}</Box>
    }
    else {
        contentToShow = <Box bg={'transparent'} py={2}><LoadingSectionSkeleton rowsNumber={4} /></Box>
    }

    useEffect(() => {
        if (status === 'idle' && userLogged) {

            dispatch(getPersonDetailsThunk(userLogged));
        }

    }, [status, userLogged])

    return (
        <>
            {contentToShow}
        </>
    );
};

export default PersonalDetailsContainer;

const PersonDetailsForm = ({ data, userLogged, onChangeHandler }) => {
    return (
        <SectionWrapper sectionTitle={'Personal Details'} type={'grid'}>

            <Box h={''}></Box>
            <Box display='flex' justifyContent={'flex-end'} px={2}>
                <ProfilePhoto userLogged={userLogged} />
            </Box>
            <Box ><DashboardInput labelText='Job Title' name={'jobTitle'} inputValue={data?.jobTitle || ''} onChangeCallback={onChangeHandler} /></Box>
            <Box><DashboardInput labelText='Email' required name={'email'} inputValue={data?.email || ''} onChangeCallback={onChangeHandler} /></Box>
            <Box>
                <DashboardInput labelText='First Name' required name={'firstName'} inputValue={data?.firstName || ''} onChangeCallback={onChangeHandler} />
            </Box>
            <Box><DashboardInput labelText='Last Name' required name={'lastName'} inputValue={data?.lastName || ''} onChangeCallback={onChangeHandler} /></Box>
            <Box><DashboardInput labelText='Phone' name={'phone'} inputValue={data?.phone || ''} onChangeCallback={onChangeHandler} /></Box>
            <Box><DashboardInput labelText='Street' name={'street'} inputValue={data?.street || ''} onChangeCallback={onChangeHandler} /></Box>
            <Box><DashboardInput labelText='City' name={'city'} inputValue={data?.city || ''} onChangeCallback={onChangeHandler} /></Box>
            <Box><DashboardInput labelText='Country' name={'country'} inputValue={data?.country || ''} onChangeCallback={onChangeHandler} /></Box>
            <Box><DashboardInput labelText='Age' name={'age'} inputValue={data?.age || ''} onChangeCallback={onChangeHandler} type={'number'} /></Box>

        </SectionWrapper>
    )
}
import { Box, VStack, Select, Button, useToast } from '@chakra-ui/react';

import { useSelector, useDispatch } from 'react-redux';
import { interviewMessagesUpdate, interviewSettingsUpdate, interviewStatusUpdate } from '@/redux/features/interview/interviewSlice';

import SectionDescription from '@/components/Dashboard/MainArea/SectionDescription';
import DashboardInput from '@/components/FormItems/DashboardInputs/DashboardInput';
import { functionsAPI } from '@/lib/functionsAPI';

const itemsArray = [
    'Accountancy',
    'Administrative',
    'Agriculture',
    'Architectural Services',
    'Arts &amp; Entertainment',
    'Automotive',
    'Banking',
    'Biotech/Pharma',
    'Construction',
    'Consulting',
    'Customer Service',
    'Design',
    'Education',
    'Energy',
    'Engineering',
    'Finance', 'Government/Non-Profit',
    'Healthcare',
    'Hospitality', 'Information Technology',
    'Internet', 'Legal Services', 'Leisure', 'Logistics',
    'Manufacturing',
    'Marketing &amp; PR',
    'Other',
    'Procurement', 'Property',
    'Recruitment/HR',
    'Retail',
    'Sales',
    'Science', 'Technical',
    'Telecommunication',
    'Tourism', 'Translation Services'
] // move to the top of the component or use useMemo

const InterviewSetup = ({ startButtonCallback }) => {
    const toast = useToast({
        position: 'top-right',
        variant: 'left-accent'
    })
    const dispatch = useDispatch();
    const position = useSelector(state => state.interview.settings.position);
    const category = useSelector(state => state.interview.settings.category);
    const status = useSelector(state => state.interview.status);

    const userLogged = useSelector(state => state.auth.auth.data);

    const handleInputChange = (name, value) => {
        dispatch(interviewSettingsUpdate({ name, value }))
    }

    const onClickStartButton = async () => {

        try {

            dispatch(interviewStatusUpdate('loading'));
            let respFromRequest = await functionsAPI.requestAI('interview', { position, category, firstRequest: true }, userLogged.accessToken);
            if (respFromRequest && respFromRequest.status == 'Success') {

                dispatch(interviewMessagesUpdate({ role: 'system', content: respFromRequest.systemPrompt }));
                dispatch(interviewMessagesUpdate({ role: 'assistant', content: respFromRequest.content }));
                dispatch(interviewStatusUpdate(''));
                startButtonCallback();
            } else {
                throw new Error();
            }

        } catch (error) {
            console.log('error', error.message);
            toast({
                title: 'Error',
                status: 'error',
                description: error?.message || 'unknown error'
            })
            dispatch(interviewStatusUpdate(''));
        }
    }

    return (
        <VStack bg='' h='100%' w='100%' p={1} spacing={[5, 3]} justifyContent={'space-between'}>

            <VStack spacing={[5, 3]} bg='' w='75%'>
                <SectionDescription value={`Adjust the following details before start the interview.`} />

                <Box display={'flex'} bg='' flexDirection={['column', 'row']} alignItems={'center'} width={'75%'} mx={'auto'} >
                    <Box flex={1}>Job Category:</Box>
                    <Box flex={1}>
                        <Select onChange={(e) => handleInputChange('category', e.target.value)} _focusVisible={{ 'boxShadow': 'none' }} defaultValue={category || null}>
                            {/* {
                            itemsArray.map((item, index) => {
                                return (
                                    <option value={item} key={index}>{item}</option>
                                )
                            })
                        } */}
                            <option value=''> </option>
                            <option value='Information Technology'>Information Technology</option>
                            <option value='Marketing and PR'>Marketing and PR</option>
                            <option value='Education'>Education</option>
                            <option value='Education_2'>Education_2</option>
                        </Select>
                    </Box>
                </Box>
                <Box display={'flex'} bg='' flexDirection={['column', 'row']} alignItems={'center'} width={'75%'} mx={'auto'}>
                    <Box flex={1}>Job Position:</Box>
                    <Box flex={1}>
                        <DashboardInput inputValue={position} onChangeCallback={handleInputChange} name={'position'} />
                    </Box>
                </Box>
            </VStack>
            <Box bg='' display={'flex'} justifyContent={'center'} flexDirection={'row'} w='100%'  >
                <Button variant={'solid'} w={['full', 'xs']} colorScheme={'green'} onClick={onClickStartButton} isDisabled={!position || position == '' || category == ''} isLoading={status == 'loading'}>Start</Button>
            </Box>
        </VStack >
    )
}

export default InterviewSetup;
import { useMemo } from 'react';
import { Box, VStack, Select, Button, useToast, Stack, Text } from '@chakra-ui/react';

import { useSelector, useDispatch } from 'react-redux';
import { interviewMessagesUpdate, interviewSettingsUpdate, interviewStatusUpdate } from '@/redux/features/interview/interviewSlice';
import { functionsAPI } from '@/lib/functionsAPI';

import SectionDescription from '@/components/Dashboard/MainArea/SectionDescription';
import DashboardInput from '@/components/FormItems/DashboardInputs/DashboardInput';
import AnimationWrapper from '@/components/Animation/AnimationWrapper';

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

const INTERVIEW_DEFAULTS = {
    LANGUAGES: ['English', 'German', 'French', 'Spanish', 'Russian'],
    JOB_CATEGORIES: ['',
        'Agriculture, Food, and Natural Resources',
        'Architecture and Construction',
        'Arts, Audio/Video Technology, and Communication',
        'Business and Finance',
        'Education and Training',
        'Government and Public Administration',
        'Health Science',
        'Information Technology',
        'Marketing and PR',
        'Law, Public Safety, Corrections, and Security',
        'Science, Technology, Engineering, and Math',
    ],
    TOTAL_QUESTIONS: [3, 7, 10, 15],
    DIFFICULTY: ['Entry level', 'Competent level', 'Expert Level']
}


const InterviewSetup = ({ startButtonCallback }) => {
    const { LANGUAGES, JOB_CATEGORIES, TOTAL_QUESTIONS, DIFFICULTY } = INTERVIEW_DEFAULTS;

    const toast = useToast({
        position: 'top-right',
        variant: 'left-accent'
    })
    const dispatch = useDispatch();
    const position = useSelector(state => state.interview.settings.position);
    const category = useSelector(state => state.interview.settings.category);
    const language = useSelector(state => state.interview.settings.language);
    const difficulty = useSelector(state => state.interview.settings.difficulty);
    const totalQuestions = useSelector(state => state.interview.settings.totalQuestions);
    const status = useSelector(state => state.interview.status);

    const userLogged = useSelector(state => state.auth.auth.data);

    const handleInputChange = (name, value) => {
        dispatch(interviewSettingsUpdate({ name, value }))
    }
    const onClickStartButton = async () => {

        try {

            dispatch(interviewStatusUpdate('loading'));
            let respFromRequest = await functionsAPI.requestAI('interview', { position, category, language, difficulty, totalQuestions, firstRequest: true }, userLogged.accessToken);
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

    const settingsItems = [
        {
            labelValue: 'Language',
            option: <SelectComponent name='language' defaultValue={language} optionsArray={LANGUAGES} handleInputChange={handleInputChange} />
        },
        {
            labelValue: 'Difficulty',
            option: <SelectComponent name='difficulty' defaultValue={difficulty} optionsArray={DIFFICULTY} handleInputChange={handleInputChange} />
        },
        {
            labelValue: 'Total Questions',
            option: <SelectComponent name='totalQuestions' defaultValue={totalQuestions} optionsArray={TOTAL_QUESTIONS} handleInputChange={handleInputChange} />
        },
        {
            labelValue: 'Job Category',
            option: <SelectComponent name='category' defaultValue={category} optionsArray={JOB_CATEGORIES} handleInputChange={handleInputChange} />
        },
        {
            labelValue: 'Job Position',
            option: <DashboardInput inputValue={position} onChangeCallback={handleInputChange} name={'position'} />
        }
    ]

    return (
        <AnimationWrapper variant='opacity' width={'100%'} height={'100%'}>
            <VStack bg='' w='100%' p={1} spacing={[5, 3]} justifyContent={'space-between'} overflowY={'scroll'}>

                <VStack spacing={[3, 3]} bg='' w={['90%', '75%']}>
                    <SectionDescription value={`Adjust the following details before start the interview.`} />
                    {
                        settingsItems.map((elem, index) => {
                            return (
                                <SettingsElementStack labelValue={elem.labelValue} option={elem.option} key={index} />
                            )
                        })
                    }
                </VStack>
                <Box bg='' display={'flex'} justifyContent={'center'} flexDirection={'row'} w={['90%', '75%']} mb={3}  >
                    <Button variant={'solid'} w={'100%'} colorScheme={'green'} onClick={onClickStartButton} isDisabled={!position || position == '' || category == ''} isLoading={status == 'loading'}>Start</Button>
                </Box>
            </VStack >
        </AnimationWrapper>
    )
}

export default InterviewSetup;

const SettingsElementStack = ({ labelValue, option }) => {
    return (
        <Stack direction={['column', 'row']} alignItems={['flex-start', 'center']} bg='' w='100%'>
            <Box minW={'25%'} bg=''><Text fontSize={['xs', 'md']}>{labelValue}:</Text></Box>
            <Box flex={1} w='full'>
                {option}
            </Box>
        </Stack>
    )
}

const SelectComponent = ({ optionsArray, name, defaultValue, handleInputChange }) => {
    const options = useMemo(() => {
        return optionsArray.map((value, index) => <option value={value} key={`${index}_option`}>{value}</option>)
    }, [optionsArray]);

    return (
        <Select onChange={(e) => handleInputChange(name, e.target.value)} _focusVisible={{ 'boxShadow': 'none' }} defaultValue={defaultValue || null} size={['xs', 'md']}>
            {
                options
            }
        </Select>
    )
}


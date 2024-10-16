import {
    Box, Step,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    Stepper,
    useSteps,

} from '@chakra-ui/react';


import { useDispatch, useSelector } from 'react-redux';
import { inputCoverUpdate, toggleBtnLoadingStatus } from '@/redux/features/coverLetter/coverLetterSlice';
import { coverLettDrawerIsOpenToggle, setIsModifiedContent } from '@/redux/features/utility/utilitySlice';

import { functionsAPI } from '@/lib/functionsAPI';

import SectionWrapper from '@/components/Dashboard/MainArea/SectionsWrapper';
import SectionDescription from '@/components/Dashboard/MainArea/SectionDescription';
import QuizCardContainer from './CoverLetterQuiz/QuizCardContainer';

const STEPS = [
    { title: 'Step #1', description: 'A job title' },
    { title: 'Step #2', description: 'A company name' },
    { title: 'Step #3', description: 'A hiring person name' },
    { title: 'Final', description: 'Your result' },
]

const GenerateCover = ({ accessToken }) => {


    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: STEPS.length,
    })

    const dispatch = useDispatch();
    const coverText = useSelector(state => state.cover.data.value);
    const jobTitle = useSelector(state => state.cover.data.jobTitle);
    const company = useSelector(state => state.cover.data.company);
    const hiringManager = useSelector(state => state.cover.data.hiringManager);
    const isBtnLoading = useSelector(state => state.cover.__serv.btnLoading);

    const firstName = useSelector(state => state.personDetails.data.firstName);
    const lastName = useSelector(state => state.personDetails.data.lastName);
    const skills = useSelector(state => state.skills.data);

    const createPromptString = (name, skills, jobTitle, company, hiringManager) => {
        let query = `Create a cover letter based on the following data: `;
        let listOrder = 1;

        if (name && name !== '') {
            query += `${listOrder}) My name: ${name}; `;
            listOrder = listOrder + 1;
        }
        if (skills && skills.length > 0) {
            query += `${listOrder}) My skills: ${skills.map(item => item.label).join(', ')}; `;
            listOrder = listOrder + 1;
        }
        if (jobTitle && jobTitle !== '') {
            query += `${listOrder}) Job title: ${jobTitle}; `;
            listOrder = listOrder + 1;
        }
        if (company && company !== '') {
            query += `${listOrder}) Company name: ${company}; `;
            listOrder = listOrder + 1;
        }
        if (hiringManager && hiringManager !== '') {
            query += `${listOrder}) Hiring manager name: ${hiringManager}; `;
            listOrder = listOrder + 1;
        }
        return query
    }

    const onButtonClick = async (direction) => {

        switch (direction.toLowerCase()) {
            case 'next':
                if (activeStep < STEPS.length) {
                    setActiveStep(activeStep + 1)
                }

                break;
            case 'back':
                if (activeStep > 0) {
                    setActiveStep(activeStep - 1)
                }
                break;
            case 'confirm': {
                let fullName = null;

                if ((firstName && firstName !== '') && (lastName && lastName !== '')) {
                    fullName = firstName + ' ' + lastName;
                }
                else if ((firstName && firstName === '') && (lastName && lastName !== '')) {
                    fullName = lastName;
                }
                else {
                    fullName = firstName;
                }

                dispatch(toggleBtnLoadingStatus());
                let query = createPromptString(fullName, skills, jobTitle, company, hiringManager);
                let data = await functionsAPI.requestAI('coverLetterCreate', query, accessToken);

                if (data && data.status === 'Success' && (data.content && data.content !== '')) {
                    dispatch(inputCoverUpdate({ value: data.content }));
                    dispatch(setIsModifiedContent({ status: true, section: 'cover' }));
                    setActiveStep(activeStep + 1);
                }
                dispatch(toggleBtnLoadingStatus());
                break;
            }
            case 'edit': {
                dispatch(coverLettDrawerIsOpenToggle({ type: 'Create' }));
                break;
            }
            case 'save & exit': {
                dispatch(coverLettDrawerIsOpenToggle());
                break;
            }
            default:
                break;
        }
    }

    return (
        <SectionWrapper flexDirect='column' sectionTitle={'Generate a Cover Letter'}>
            <SectionDescription value={'Pass the quiz to allow our assistant to generate your cover letter.'} />
            {activeStep < 4 &&
                <Stepper index={activeStep} width={'100%'} size='md' colorScheme='teal'>
                    {STEPS.map((step, index) => (
                        <Step key={index} >
                            <StepIndicator>
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />
                            </StepIndicator>

                            {/* <Box>
                                    <StepTitle>{step.title}</StepTitle>
                                    <StepDescription >{step.description}</StepDescription>
                                </Box> */}
                            <StepSeparator />
                        </Step>
                    ))}
                </Stepper>
            }

            <Box bg='' p={2}   >
                {
                    activeStep === 0 &&
                    <QuizCardContainer
                        variant={'question'}
                        bgColor={'gray.50'}
                        activeStep={activeStep}
                        inputValue={jobTitle}
                        inputName={'jobTitle'}
                        title={'Job Title'}
                        hint={`Add a title like ‘Senior Developer', 'Sales Manager' or 'Crime Reporter', etc.`}
                        onButtonClick={onButtonClick}
                    />
                }
                {
                    activeStep === 1 &&
                    <QuizCardContainer
                        variant={'question'}
                        bgColor={'gray.50'}
                        activeStep={activeStep}
                        inputValue={company}
                        inputName={'company'}
                        title={'Company Name'}
                        hint={`Provide the company name. `}
                        onButtonClick={onButtonClick}
                    />
                }
                {
                    activeStep === 2 &&
                    <QuizCardContainer
                        variant={'question'}
                        bgColor={'gray.50'}
                        activeStep={activeStep}
                        inputValue={hiringManager}
                        inputName={'hiringManager'}
                        title={'Hiring Manager Name'}
                        hint={`Provide the manager name, or leave it blank.`}
                        onButtonClick={onButtonClick}
                    />
                }
                {
                    activeStep === 3 &&
                    <QuizCardContainer
                        variant={'confirmation'}
                        bgColor={'gray.50'}
                        activeStep={activeStep}
                        onButtonClick={onButtonClick}
                        hiringObj={{ jobTitle, company, hiringManager }}
                        personDetails={{ firstName, lastName, skills }}
                        isBtnLoading={isBtnLoading}
                    />


                }
                {
                    activeStep === 4 &&
                    <QuizCardContainer
                        variant={'final'}
                        bgColor={'gray.50'}
                        activeStep={activeStep}
                        onButtonClick={onButtonClick}
                        coverText={coverText}

                    />
                }

            </Box>
        </SectionWrapper>
    );
};

export default GenerateCover;
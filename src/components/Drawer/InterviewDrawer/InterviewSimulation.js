import SectionDescription from '@/components/Dashboard/MainArea/SectionDescription';
import { IoCheckmarkDone } from "react-icons/io5";
import {
    Step,
    StepIndicator,
    StepSeparator,
    StepStatus,
    Stepper,
    useSteps, Box, Heading, VStack, Text, Spinner
} from '@chakra-ui/react';

import InterviewSetup from './InterviewSteps/InterviewSetup';
import InterviewProcess from './InterviewSteps/InterviewProcess';
import InterviewConclusion from './InterviewSteps/InterviewConclusion';

const steps = [
    { title: '', description: 'Setup' },
    { title: ' ', description: 'Running interview process' },
    { title: ' ', description: 'Conclusion' },
]


const InterviewSimulation = () => {
    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    });

    const activeStepText = steps[activeStep].description;

    const toTheNextStep = () => {
        {
            if (activeStep < steps.length - 1) {
                setActiveStep(activeStep + 1)
            }
        }
    }

    return (
        <Box bg='' height={'100%'} display={'flex'} flexDirection={'column'} p={[2, 5]} w='100%'>
            <Box bg=''>
                <Heading as='h3' size={['sm', 'md', 'md']} pb={2}>Interview Simulation</Heading>
                <SectionDescription value={`Challenge yourself with our AI-driven interview simulation, and receive immediate evaluation to refine your knowledge and skills.`} />
                <VStack alignItems={'flex-start'} px={[2, 5]} pb={2} >

                    <Stepper index={activeStep} colorScheme='teal' size={'sm'} w='100%'>
                        {steps.map((step, index) => (
                            <Step key={index} gap='0'>
                                <StepIndicator>
                                    <StepStatus complete={<IoCheckmarkDone />} active={activeStep == 2 ? <IoCheckmarkDone /> : <Spinner color='teal' />} />
                                </StepIndicator>
                                <StepSeparator _horizontal={{ ml: '0' }} />
                            </Step>
                        ))}
                    </Stepper>

                    <Text><b>{activeStepText}</b></Text>


                </VStack>
            </Box>

            <Box bg='' flex={1} py={[1, 2]} borderColor={'teal.50'} borderWidth={1} borderRadius={10} overflow={'hidden'}>

                {
                    activeStep == 0 && <InterviewSetup startButtonCallback={toTheNextStep} />
                }
                {
                    activeStep == 1 && <InterviewProcess toTheNextStep={toTheNextStep} />
                }
                {
                    activeStep == 2 && <InterviewConclusion />
                }


            </Box>

        </Box >
    );
};

export default InterviewSimulation;




import { Suspense, lazy } from 'react';
import {
    Step,
    StepIndicator,
    StepSeparator,
    StepStatus,
    Stepper,
    StepNumber,
    useSteps, Box, Heading, VStack, Text, HStack,
} from '@chakra-ui/react';

import { IoCheckmarkDone } from "react-icons/io5";
import { AnimatePresence } from 'motion/react';

import SectionDescription from '@/components/Dashboard/MainArea/SectionDescription';

const InterviewSetup = lazy(() => import('./InterviewSteps/InterviewSetup'));
const InterviewProcess = lazy(() => import('./InterviewSteps/InterviewProcess'));
const InterviewConclusion = lazy(() => import('./InterviewSteps/InterviewConclusion'));


const steps = [
    { title: 'Setup', description: '' },
    { title: 'Interview', description: '' },
    { title: 'Conclusion', description: '' },
]


const InterviewSimulation = () => {
    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    });

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

                    <Stepper index={activeStep} colorScheme='teal' size={'sm'} w='100%' mt={3}>
                        {steps.map((step, index) => (
                            <Step key={index}>
                                <Box display={'flex'} flexDir={['column']} alignItems={'center'} >
                                    <StepIndicator >
                                        <StepStatus
                                            complete={<IoCheckmarkDone />}
                                            incomplete={<StepNumber />}
                                            active={activeStep == 2 ? <IoCheckmarkDone /> : <StepNumber />}
                                        />
                                    </StepIndicator>

                                </Box>
                                <StepSeparator />
                            </Step>
                        ))}
                    </Stepper>
                    <HStack width={'100%'} justifyContent={'space-between'}>
                        {
                            steps.map((step, index) => {
                                let align = 'left';
                                if (index == 1) {
                                    align = 'center';
                                }
                                if (index == 2) {
                                    align = 'right';
                                }
                                return (
                                    <Text textAlign={align} color={activeStep == index ? 'teal' : '#CBD5E0'} key={index} flex={1} fontSize={'xs'}>{step.title}</Text>
                                )
                            })
                        }
                    </HStack>


                </VStack>
            </Box>

            <Box bg='white' flex={1} py={[2, 2]} borderColor={'teal.400'} borderWidth={1} borderRadius={10} overflow={'hidden'}>
                <Box bg='' my={1} overflow={'scroll'} h='100%'>

                    <Suspense fallback={<Loading />}>
                        <AnimatePresence mode='wait'>
                            {
                                activeStep == 0 && <InterviewSetup startButtonCallback={toTheNextStep} key={'InterviewSetup'} />
                            }
                            {
                                activeStep == 1 && <InterviewProcess toTheNextStep={toTheNextStep} key={'InterviewProcess'} />
                            }
                            {
                                activeStep == 2 && <InterviewConclusion key={'InterviewConclusion'} />
                            }
                        </AnimatePresence>
                    </Suspense>
                </Box>
            </Box>

        </Box >
    );
};

export default InterviewSimulation;


const Loading = () => {
    return (
        <div style={{ display: 'flex', height: '100vh', width: '100%', margin: 1, padding: 1, alignItems: 'center', justifyContent: 'center' }}>
            <h2>Loading... Please wait.</h2>
        </div>
    )
}
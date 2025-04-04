import { useEffect } from 'react';
import { toaster } from '@/components/ui/toaster';
import { List, Text, Heading, Button, Box, VStack, Spinner } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { interviewConclusionUpdate, interviewMessagesClear, setCurrentStep, setInterviewStatus } from '@/redux/interview/interviewSlice';

import DetailsChart from './interviewCharts/DetailsChart';
import { toolkitData } from '@/lib/content-lib';
import { getDataFromFunctionsEndpoint } from '@/lib/commonScripts';


const InterviewConclusion = ({ stepDescription, ref }) => {
    const dispatch = useDispatch();
    const conclusion = useSelector(state => state.interview.data.conclusion);
    const messagesInState = useSelector(state => state.interview.data.messages);
    const status = useSelector(state => state.interview.status);

    const backToStart = () => {
        dispatch(interviewMessagesClear());
        dispatch(setCurrentStep(0));
    }

    useEffect(() => {
        const createConclusion = async (messagesInState) => {

            try {

                dispatch(setInterviewStatus('loading'));
                const messagesToAnalyze = messagesInState.slice(1, messagesInState.length - 1);

                const options = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(
                        {
                            query: {
                                messages: messagesToAnalyze,
                                isFinal: true,
                                jsonFormat: true
                            },
                            variant: 'interview'
                        }),
                };
                const res = await getDataFromFunctionsEndpoint('generateData', options);
                if (res) {
                    let result = await res.json();

                    if (result.status == 'Success') {

                        dispatch(interviewConclusionUpdate(JSON.parse(result.content)));
                        dispatch(setInterviewStatus('fulfilled'));
                    } else {
                        throw new Error(result.message)
                    }

                } else {
                    throw new Error('No server response')
                }

            } catch (error) {
                dispatch(setInterviewStatus('error in conclusion'));
                toaster.create({
                    type: 'error',
                    title: 'Error',
                    description: error.message
                })
            }
        }

        if (!conclusion) {
            createConclusion(messagesInState)
        }
    }, [conclusion])

    return (
        <Box height={'100%'} overflow={'scroll'} ref={ref} w='full'>
            {
                status != 'fulfilled'
                    ? <Box display={'flex'} flex={1} alignItems={'center'} justifyContent={'center'}>
                        <Spinner color="teal.500" size="lg" />
                    </Box>

                    : <>
                        <Heading as={'h3'} size={['sm', 'md']} mt={1}>{stepDescription}</Heading>
                        <List.Root variant={'plain'} gap={[3, 10]} w='full' height={'100%'} mt={3}>
                            <List.Item>
                                <Text px={1}>{conclusion?.greetings}</Text>
                            </List.Item>

                            <List.Item>
                                <VStack w='full' bg='' gap={3}>
                                    <Heading as={'h2'} size={['sm', 'md']} >Statistics:</Heading>
                                    {
                                        conclusion?.details
                                            ? <DetailsChart details={conclusion.details} />
                                            : <MissedDataText />
                                    }
                                </VStack>
                            </List.Item>

                            <List.Item flexDirection={'column'}  >
                                <VStack w='full' bg='' gap={3}>
                                    <Heading as={'h2'} size={['sm', 'md']} >{toolkitData.tools.interview.conclusion.Analysis ?? 'Analysis'}:</Heading>
                                    {
                                        conclusion?.analysis
                                            ?
                                            <Text px={1} fontSize={['sm', 'md']}>{conclusion.analysis}</Text>
                                            :
                                            <MissedDataText />
                                    }
                                </VStack>
                            </List.Item>
                            <List.Item flexDirection={'column'}  >
                                <VStack w='full' bg='' gap={3}>
                                    <Heading as={'h2'} size={['sm', 'md']}  >{toolkitData.tools.interview.conclusion.conclusion ?? 'Conclusion'}:</Heading>
                                    {
                                        conclusion?.conclusion
                                            ?
                                            <Text px={1} fontSize={['sm', 'md']}>{conclusion.conclusion}</Text>
                                            : <MissedDataText />
                                    }
                                </VStack>
                            </List.Item>
                            <List.Item flexDirection={'column'}>
                                <VStack w='full' bg='' gap={3}>
                                    <Heading as={'h2'} size={['sm', 'md']}  >{toolkitData.tools.interview.conclusion.recommendations ?? 'Recommendations'}:</Heading>
                                    {
                                        conclusion?.recommendations
                                            ?
                                            <Text px={1} fontSize={['sm', 'md']}>{conclusion.recommendations}</Text>
                                            : <MissedDataText />
                                    }
                                </VStack>
                            </List.Item>
                            <List.Item>
                                <Box display={'flex'} justifyContent={'center'} w='full'>
                                    <Button size={['xs', 'sm']} colorPalette={'teal'} onClick={backToStart}>{toolkitData.tools.interview.conclusion.buttonText ?? 'OK'}</Button>
                                </Box>
                            </List.Item>

                        </List.Root>
                    </>
            }
        </Box >
    );
};

export default InterviewConclusion;

const MissedDataText = () => {
    return (
        <Text fontSize={'sm'} fontStyle={'italic'} color={'gray.500'}>..missed data</Text>
    )
}


import React, { useEffect, useRef } from 'react';

import { toaster } from '@/components/ui/toaster';
import { VStack, Box, Button, Textarea, List, Separator, Text, Heading } from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { interviewMessagesUpdate, setCurrentStep, setInterviewStatus } from '@/redux/interview/interviewSlice';

import { getDataFromFunctionsEndpoint, sanitizeInput } from '@/lib/commonScripts';
import { BsRobot } from "react-icons/bs";

const InterviewProcess = ({ stepDescription, ref }) => {
    const dispatch = useDispatch();
    const userLogged = useSelector(state => state.auth.data);
    const accessToken = userLogged?.accessToken ?? null;

    const messagesInState = useSelector(state => state.interview.data.messages);

    const status = useSelector(state => state.interview.status);

    const chatMessagesAreaRef = useRef(null);
    const inputRef = useRef(null);
    const reg = /\n\n/g;

    const submitAnswer = async () => {
        let messagesArray;

        try {

            dispatch(setInterviewStatus('loading'));

            let userData = (inputRef.current.value).trim(); // clear whitespaces
            userData = sanitizeInput(userData); // sanitize input

            dispatch(interviewMessagesUpdate({ role: 'user', content: userData }));
            messagesArray = [...messagesInState, { role: 'user', content: userData }];
            inputRef.current.value = '';

            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        query: {
                            messages: messagesArray
                        },
                        variant: 'interview'
                    }),
            };
            const res = await getDataFromFunctionsEndpoint('generateData', options);

            if (res) {
                let result = await res.json();

                if (result.status == 'Success') {
                    dispatch(interviewMessagesUpdate({ role: 'assistant', content: result.content }));
                    if (result.content.includes('END of the INTERVIEW')) {
                        dispatch(setCurrentStep(2));
                    }
                } else {
                    throw new Error(result.message)
                }

            } else {
                throw new Error('No server response')
            }

        } catch (error) {
            toaster.create({
                type: 'error',
                title: 'Error',
                description: error.message
            })
        } finally {
            dispatch(setInterviewStatus(''));
        }
    }

    useEffect(() => {
        let lastChild = chatMessagesAreaRef?.current?.lastElementChild;

        if (messagesInState && messagesInState.length > 2) {
            lastChild.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [messagesInState])

    return (

        <>

            {
                (!messagesInState || messagesInState.length < 1)
                    ? null  //return null  if no data
                    :
                    <VStack w='full' h={'100%'} bg='' justifyContent={'space-between'} p={[3, 6]} borderWidth={2} borderColor={'#CBD5E0'} mx={1} overflow='hidden' ref={ref}>
                        <Heading as={'h3'} size={['sm', 'md']} my={1}>{stepDescription}</Heading>

                        {/* chat messages.. */}
                        <List.Root align="end" variant={'plain'} py={1} px={3} gap={[3, 5]} ref={chatMessagesAreaRef} bg='' w='full' overflow={'scroll'} height={'100%'} >

                            {
                                messagesInState.map((mess, index) => {

                                    switch (mess.role) {
                                        case 'assistant':
                                            if ((mess.content).includes('END of the INTERVIEW')) {
                                                break;
                                            }
                                            return (
                                                <List.Item bg='' key={index}>
                                                    <List.Indicator asChild color="teal.500" boxSize={['5', '10']}>
                                                        <BsRobot />
                                                    </List.Indicator>
                                                    <Box bg={'teal.100'} borderRadius={10} borderBottomLeftRadius={0} maxWidth={'85%'} p={3} paddingRight={5} ml={2} gap={0} display={'flex'} flexDirection={'column'}>
                                                        {
                                                            mess.content.split(reg).map((textLine, indexLine) => {

                                                                return (
                                                                    <Text key={indexLine} mb={2} fontSize={['sm', 'md']}>
                                                                        {textLine}
                                                                    </Text>
                                                                )
                                                            })
                                                        }
                                                    </Box>
                                                </List.Item>
                                            )

                                        case 'user':
                                            return (
                                                <List.Item key={index}>
                                                    <Box bg='' w='full' display={'flex'} justifyContent={'flex-end'} alignItems={'flex-end'} >
                                                        <Box bg={'gray.100'} borderRadius={10} borderBottomRightRadius={0} maxWidth={'75%'} p={3} paddingRight={5} mr={0} >
                                                            <Text fontSize={['sm', 'md']} mb={2}>

                                                                {mess.content}
                                                            </Text>
                                                        </Box>
                                                    </Box>
                                                </List.Item>
                                            )
                                        default:
                                            break;
                                    }

                                })
                            }

                        </List.Root>
                        {/* chat messages end .. */}

                        {/* input and submit button */}
                        <Separator h='2px' w='full' />
                        <Box display='flex' flexDirection={['column', 'row']} gap={1} w='full' alignItems={'center'}>
                            <Box bg='' display={'column'} w='100%'>
                                <Textarea
                                    ref={inputRef}
                                    w='full'
                                    placeholder='type your reply'
                                    resize={'none'}
                                    borderWidth={'1px'}
                                    borderStyle={'solid'}
                                    borderRadius={'lg'}
                                    _focusVisible={{ outline: 'none', border: '1px solid teal' }}
                                    disabled={status == 'loading' || messagesInState.length == 0}
                                />
                            </Box>
                            <Box bg=''>
                                <Button w={'100%'}
                                    colorPalette='teal'
                                    disabled={messagesInState.length == 0}
                                    loading={status == 'loading'}
                                    variant={'ghost'}
                                    onClick={() => submitAnswer()}
                                // onClick={sendButtonHandler}
                                >
                                    Send
                                </Button>
                            </Box>
                        </Box>

                    </VStack >

            }

        </>

    );
};

export default InterviewProcess;
import { useEffect, useRef } from 'react';
import { Box, VStack, Textarea, Button, List, ListItem, Icon, useToast } from '@chakra-ui/react';

import { useSelector, useDispatch } from 'react-redux';
import { interviewConclusionUpdate, interviewMessagesUpdate, interviewStatusUpdate } from '@/redux/features/interview/interviewSlice';

import { functionsAPI } from '@/lib/functionsAPI';
import sanitizeString from '@/lib/sanitizeString';

import { MdOutlineAutoAwesome } from "react-icons/md";
import { AiOutlineCaretDown } from "react-icons/ai";
import AnimationWrapper from '@/components/Animation/AnimationWrapper';

const InterviewProcess = ({ toTheNextStep }) => {
    const toast = useToast({
        position: 'top-right',
        variant: 'left-accent'
    })
    const inputRef = useRef(null);
    const chatMessagesAreaRef = useRef(null);
    const messagesInState = useSelector(state => state.interview.data.messages);
    const status = useSelector(state => state.interview.status);
    const userLogged = useSelector(state => state.auth.auth.data);
    const dispatch = useDispatch();

    const sendButtonHandler = async () => {
        dispatch(interviewStatusUpdate('loading'));
        let messagesArray;
        let userRequest = sanitizeString(inputRef.current.value); // sanitizing
        inputRef.current.value = '';

        dispatch(interviewMessagesUpdate({ role: 'user', content: userRequest }));
        messagesArray = [...messagesInState, { role: 'user', content: userRequest }];

        try {
            let replyAssistant = await functionsAPI.requestAI('interview', { messages: messagesArray }, userLogged.accessToken);
            if (replyAssistant && replyAssistant.status == 'Success') {
                // create assistant object { role: 'assistant', content: replyAssistant } and pass it to messages array in state
                dispatch(interviewMessagesUpdate({ role: 'assistant', content: replyAssistant.content }));
                dispatch(interviewStatusUpdate(''));
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log('error', error.message);
            toast({
                status: 'error',
                title: 'Error',
                description: error?.message || 'unknown error'
            })
            dispatch(interviewStatusUpdate(''));
        }
        return null
    }

    const createConclusion = async () => {
        const messagesToAnalyze = messagesInState.slice(1, messagesInState.length - 1);
        try {
            dispatch(interviewStatusUpdate('loading'));

            let replyAssistant = await functionsAPI.requestAI('interview', { messages: messagesToAnalyze, isFinal: true, jsonFormat: true }, userLogged.accessToken);
            if (replyAssistant && replyAssistant.status == 'Success') {

                dispatch(interviewConclusionUpdate(JSON.parse(replyAssistant.content)))
                dispatch(interviewStatusUpdate(''));

                toTheNextStep();
            } else {
                throw new Error('Error while creating a conclusion report.');
            }
        } catch (error) {
            console.log('error', error.message);
            toast({
                status: 'error',
                title: 'Error',
                description: error?.message || 'unknown error'
            })
            dispatch(interviewStatusUpdate(''));
        }
        return null
    }

    useEffect(() => {
        let lastChild = chatMessagesAreaRef?.current?.lastElementChild;

        if (messagesInState && messagesInState.length > 2) {
            lastChild.scrollIntoView({ behavior: 'smooth', block: 'end' });

            if ((messagesInState[messagesInState.length - 1].content).includes('END of the INTERVIEW')) {
                createConclusion();
            }
        }


    }, [messagesInState])
    return (
        <AnimationWrapper variant='scaleCard' width={'100%'} height={'100%'} >
            <VStack h={'100%'} bg='' justifyContent={'space-between'} overflow={'hidden'} borderWidth={0} borderColor={'#CBD5E0'} mx={1}>

                <List p={2} spacing={[3, 5]} overflow={'hidden'} overflowY={'scroll'} ref={chatMessagesAreaRef}>
                    {
                        (messagesInState && messagesInState.length > 0) &&
                        messagesInState.map((mess, index) => {

                            switch (mess.role) {
                                case 'assistant':
                                    if ((mess.content).includes('END of the INTERVIEW')) {
                                        break;
                                    }
                                    return (
                                        <ListItem key={index}>
                                            <Box bg='' display={'flex'} justifyContent={'flex-start'} alignItems={'flex-end'}>
                                                <Icon as={MdOutlineAutoAwesome} />
                                                <Icon as={AiOutlineCaretDown} boxSize={'20px'} style={{ transform: 'translateY(7px) rotate(-45deg)' }} color={'teal.100'} p={0} mr={'-19px'} border={'0px'} />
                                                <Box bg={'teal.100'} borderRadius={10} borderBottomLeftRadius={0} maxWidth={'75%'} p={3} paddingRight={5} ml={2}>
                                                    {mess.content}
                                                </Box>
                                            </Box>
                                        </ListItem>
                                    )

                                case 'user':
                                    return (
                                        <ListItem key={index}>
                                            <Box bg='' display={'flex'} justifyContent={'flex-end'} alignItems={'flex-end'}>
                                                <Box bg={'gray.100'} borderRadius={10} borderBottomRightRadius={0} maxWidth={'75%'} p={3} paddingRight={5} mr={0} >
                                                    {mess.content}
                                                </Box>
                                                <Icon as={AiOutlineCaretDown} boxSize={'20px'} style={{ transform: 'translateY(7px) rotate(45deg)' }} color={'gray.100'} p={0} ml={'-11px'} border={'0px'} />
                                            </Box>
                                        </ListItem>
                                    )
                                default:
                                    break;
                            }

                        })
                    }
                </List>
                <Box w='100%'>
                    <Box w='45%' height={'2px'} bg='teal.400' margin={'0 auto 5px auto'}></Box>
                    <Box bg='' w='100%' display={'flex'} flexDir={['column', 'row']} p={1}>
                        <Box bg='' display={'column'} w='100%' mr={[0, 1]}>
                            <Textarea ref={inputRef} placeholder='type your reply' colorScheme={'teal'} focusBorderColor='none' _focusVisible={{ 'boxShadow': 'none' }} borderWidth={1} resize={'none'}
                                isDisabled={status == 'loading' || messagesInState.length == 0}
                            />
                        </Box>
                        <Box bg=''>
                            <Button w={'100%'} h={'100%'}
                                colorScheme='teal'
                                variant={'ghost'}
                                isDisabled={messagesInState.length == 0}
                                isLoading={status == 'loading'}
                                onClick={sendButtonHandler}
                            >
                                Send
                            </Button>
                        </Box>
                    </Box>
                </Box>

            </VStack>
        </AnimationWrapper>
    );
}
export default InterviewProcess;
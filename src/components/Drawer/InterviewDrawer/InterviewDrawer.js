'use client'
import { BackIcon } from '@/components/Icons/Icon';
import ToolTip from '@/components/ToolTip/ToolTip';
import { interviewDrawerIsOpenToggle } from '@/redux/features/utility/utilitySlice';
import { Box, Center, DrawerBody, DrawerHeader, HStack, DrawerFooter } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { interviewMessagesClear } from '@/redux/features/interview/interviewSlice';
import InterviewSimulation from './InterviewSimulation';
import FooterString from '@/components/Footer/FooterString';

const InterviewDrawer = () => {
    const dispatch = useDispatch();

    const backButtonHandler = () => {
        dispatch(interviewDrawerIsOpenToggle());
        dispatch(interviewMessagesClear());
    }

    return (
        <>
            <DrawerHeader borderBottomWidth='1px' py={[1, 2]} w='100%' >

                <HStack>
                    <Box bg='' onClick={backButtonHandler} >
                        <ToolTip label='back to dashboard'>
                            <BackIcon />
                        </ToolTip>
                    </Box>
                    <Box w='full' >
                        <Center>AI Interview Trainer</Center>
                    </Box>
                </HStack>
            </DrawerHeader >
            <DrawerBody className='mainBg' py={2} px={1} overflow={'hidden'}>
                <Box bg='' display={'flex'} flexDirection={'column'} height={'100%'} alignItems={'center'} justifyContent={'center'}>
                    <Box flex={1}
                        bg={'white'}
                        border={'1px'}
                        borderColor={'gray.200'}
                        borderRadius={10}
                        maxW={'2xl'}
                        p={0}
                        m={0}
                        alignItems={'center'}
                        justifyContent={'center'}
                        display={'flex'}
                        flexDirection={'column'}
                        overflowY={'scroll'}
                    >
                        <InterviewSimulation />
                    </Box>
                </Box>
            </DrawerBody>


            <DrawerFooter bg='' justifyContent={'center'} py={0.5}><FooterString /></DrawerFooter>
        </>
    );
};

export default InterviewDrawer;


const old = () => {
    return (<DrawerBody className='mainBg' px={1} boxSizing='border-box' bg='blue.300'>
        <Box bg='green' display={'flex'} flex={1} flexDirection={'column'} flexShrink={1} flexGrow={1}>test</Box>
        {/* <Flex bg='red' flexDirection={'row'} alignItems={'center'} justifyContent={'center'} w='full' p={0} flex={1}>
                    <Container
                        as='div'
                        bg={'white'}
                        border={'1px'}
                        borderColor={'gray.200'}
                        borderRadius={10}
                        maxW={'2xl'}
                        p={0}
                        m={0}
                        // mx={'auto'}
                        // minH={'50vh'}
                        // height={'100%'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        display={'flex'}
                        flexDirection={'column'}
                        overflowY={'scroll'}
                    >

                        <InterviewSimulation />

                    </Container>
                    d
                </Flex> */}
    </DrawerBody>)
}
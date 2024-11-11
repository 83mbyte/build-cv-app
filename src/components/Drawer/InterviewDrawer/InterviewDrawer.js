'use client'
import { BackIcon } from '@/components/Icons/Icon';
import ToolTip from '@/components/ToolTip/ToolTip';
import { interviewDrawerIsOpenToggle } from '@/redux/features/utility/utilitySlice';
import { Box, Center, DrawerBody, DrawerHeader, HStack, Flex, Container } from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import InterviewSimulation from './InterviewSimulation';

const InterviewDrawer = () => {
    const dispatch = useDispatch();
    return (
        // 
        <>
            <DrawerHeader borderBottomWidth='1px' py={[2, 4]}>

                <HStack>
                    <Box bg='' onClick={() => dispatch(interviewDrawerIsOpenToggle())} >
                        <ToolTip label='back to dashboard'>
                            <BackIcon />
                        </ToolTip>
                    </Box>
                    <Box w='full' >
                        <Center>AI Interview Trainer</Center>
                    </Box>
                </HStack>
            </DrawerHeader>

            <DrawerBody className='mainBg'>
                <Flex bg='transparent' flexDirection={'column'} alignItems={'center'} justifyContent={'center'} w='full' h={'90%'} p={0}>
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
                        minH={'50vh'}
                        height={'100%'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        display={'flex'}
                        flexDirection={'column'}
                        overflowY={'scroll'}
                    >
                        <InterviewSimulation />

                    </Container>
                </Flex>
            </DrawerBody>
        </>
    );
};

export default InterviewDrawer;
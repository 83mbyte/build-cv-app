
import React from 'react';
import { Box, Heading, Highlight, Text, VStack, Button, ButtonGroup } from '@chakra-ui/react';
import { motion } from "framer-motion";

import { useNavigate } from 'react-router-dom';
import WelcomeBlockImage from './WelcomeBlockImage';
const WelcomeTopElement = () => {
    const navigate = useNavigate();
    const apiKey = process.env.REACT_APP_API_KEY;
    let AccessAreaButtons;
    const currentDate = new Date().getTime();
    const sessionString = sessionStorage.getItem(`firebase:authUser:${apiKey}:[DEFAULT]`);
    const localStorageString = localStorage.getItem(`firebase:authUser:${apiKey}:[DEFAULT]`);

    if ((sessionString
        &&
        JSON.parse(sessionString).stsTokenManager.expirationTime > currentDate) || (localStorageString && JSON.parse(localStorageString).stsTokenManager.expirationTime > currentDate)) {
        AccessAreaButtons = <Box>
            <Button
                variant={'outline'}
                colorScheme={'teal'}
                onClick={() => navigate('/dashboard')}
            >
                Access Dashboard
            </Button>
        </Box>

    } else {
        AccessAreaButtons = <ButtonGroup colorScheme={'teal'} spacing={4} size={'md'}>
            <Button onClick={() => navigate('/login')} variant={'outline'} >Login</Button>
            <Button onClick={() => navigate('/signup')} variant={'solid'} > Register</Button>
        </ButtonGroup >
    }
    return (
        <Box
            bg='white'
            w='full'
            py={'10'}
            pb={'0'}
            px={0}
            mx={2}
            borderTopWidth={'1px'}
            borderColor={'gray.300'}
            borderLeft={'none'}
            borderRight={'none'}
            justifyContent={'center'}
            display={'flex'}
            flexDirection={'column'}
        >
            <VStack bg={''} w={['full', 'xl', '2xl']} mx={'auto'} spacing={'3'} >
                <Text textAlign={'center'} fontSize={['sm', 'lg']}>Build Resume Online</Text>
                <Box as={motion.div}
                    initial={{ y: -50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1, transition: { delay: 0.3, duration: 0.8 } }}
                >
                    <Heading as='h1' size={['xl', '2xl']} textAlign={'center'} >
                        Effortlessly make a job-worthy <Highlight query={'resume'} styles={{ px: '0.5', pt: '0', pb: '0.5', bg: 'rgba(250,250,137,0.8)', }}>resume</Highlight> that gets you hired faster.
                    </Heading>
                </Box>

                <Box bg='' w={['xs', 'md']} >
                    <Text color={'gray.500'} textAlign={'center'} fontSize={['sm', 'md']} bg={'rgba(250,250,250,0.4)'}>Use field-tested templates that follow the exact so-called "resume rules" hirers look for.
                        <Highlight query={'Easy to use'} styles={{ px: '0.5', py: '0.5', bg: 'rgba(250,250,137,0.8)', color: 'gray.500' }}>Easy to use - instant result.</Highlight></Text>
                </Box>
                <Box justifyContent={'center'} display={'flex'} py={3}>
                    {AccessAreaButtons}
                </Box>
            </VStack>

            <WelcomeBlockImage imgName={'welcome1.jpg'} />
        </Box >

    );
};

export default WelcomeTopElement;
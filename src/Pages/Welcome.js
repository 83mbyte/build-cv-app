import { Box, Button, ButtonGroup, VStack, Heading, Text, Highlight } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const Welcome = () => {
    let AccessAreaButtons;
    const navigate = useNavigate();
    const apiKey = process.env.REACT_APP_API_KEY;

    const currentDate = new Date().getTime();
    const sessionString = sessionStorage.getItem(`firebase:authUser:${apiKey}:[DEFAULT]`);

    if (sessionString
        &&
        JSON.parse(sessionString).stsTokenManager.expirationTime > currentDate) {
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
        AccessAreaButtons = <ButtonGroup variant={'solid'} colorScheme={'teal'} spacing={4} size={'md'}>
            <Button onClick={() => navigate('/login')}>Login</Button>
            <Button onClick={() => navigate('/signup')}> Register</Button>
        </ButtonGroup >
    }
    return (
        <VStack w={'full'} spacing={0} borderColor={'gray.300'} borderWidth={'0px'} borderRadius={'md'}>
            <Box
                bg='white'
                w='full'
                py={'10'}
                pb={'0'}
                px={1}
                mx={2}
                borderWidth={'0px'}
                borderColor={'gray.300'}
                borderLeft={'none'}
                borderRight={'none'}
                justifyContent={'center'}
                display={'flex'}
            >
                <VStack bg={''} w={['sm', 'xl', '2xl']} mx={'auto'} spacing={'3'} >
                    <Text textAlign={'center'} fontSize={['sm', 'lg']}>Build Resume Online</Text>
                    <Box as={motion.div}
                        initial={{ x: 200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1, }}
                    >
                        <Heading as='h1' fontSize={['2xl', '5xl']} textAlign={'center'} >
                            Effortlessly make a job-worthy <Highlight query={'resume'} styles={{ px: '0.5', pt: '0', pb: '0.5', bg: 'yellow.200', }}>resume</Highlight> that gets you hired faster.
                        </Heading>
                    </Box>

                    <Box bg='' w={['xs', 'md']} >
                        <Text color={'gray.500'} textAlign={'center'} fontSize={['sm', 'md']} bg={'rgba(250,250,250,0.4)'}>Use field-tested templates that follow the exact so-called "resume rules" hirers look for.
                            <Highlight query={'Easy to use'} styles={{ px: '0.5', py: '0.5', bg: 'yellow.200', color: 'gray.500' }}>Easy to use - instant result.</Highlight></Text>
                    </Box>
                    <Box justifyContent={'center'} display={'flex'} py={3}>
                        {AccessAreaButtons}
                    </Box>

                </VStack>
            </Box >

            <Box
                bg='white'
                w='full'
                py={'0'}
                px={1}
                h={'300px'}
                borderBottomWidth={'1px'}
                borderColor={'gray.300'}
                borderLeft={'none'}
                borderRight={'none'}
                justifyContent={'center'}
                display={'flex'}
                backgroundRepeat={'no-repeat'}
                backgroundPosition={'bottom'}
                backgroundSize={'contain'}
                backgroundImage={`url(/welcome1.jpg)`}
            >
            </Box>
        </VStack >

    );
};

export default Welcome;



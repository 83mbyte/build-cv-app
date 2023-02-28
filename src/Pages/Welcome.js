import { Box, Button, ButtonGroup, Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CopyRights from '../components/CopyRights/CopyRights';

const Welcome = () => {
    let AccessAreaButtons;
    const navigate = useNavigate();

    const currentDate = new Date().getTime();
    const sessionString = sessionStorage.getItem('firebase:authUser:AIzaSyBiwGLTM7B9LxKqjPRjiA_CcPTyr8uiFzE:[DEFAULT]');

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
        AccessAreaButtons = <ButtonGroup variant={'solid'} colorScheme={'teal'} spacing={4}>
            <Button onClick={() => navigate('/login')}>Login</Button>
            <Button onClick={() => navigate('/signup')} > Register</Button>
        </ButtonGroup >
    }

    return (

        <VStack h="100vh" minH={'300px'} justifyContent={'space-around'}   >
            <Box></Box>
            <Box w={'full'}
                p={8}
                mt={1}
                mx={'auto'}
                border={['none', '1px']}
                borderColor={['', 'gray.300']}
                borderRadius={10}
                bg={['', 'white']}
            >
                <VStack spacing={1} w='full' align={['flex-start', 'center']}>
                    <Heading as='h2'>Welcome To IntroduceMe App</Heading>
                </VStack>
                <VStack p={2}>
                    {AccessAreaButtons}
                </VStack>
            </Box>
            <CopyRights />
        </VStack>
    );
};

export default Welcome;
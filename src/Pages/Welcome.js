import { Box, Button, ButtonGroup, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FooterContainer from '../components/Footer/FooterContainer';

const Welcome = () => {
    let AccessAreaButtons;
    const navigate = useNavigate();

    const currentDate = new Date().getTime();
    const sessionString = sessionStorage.getItem('firebase:authUser:AIzaSyCjVszZ0A5IyvG2cmBNX0-uONLzzRYMWLU:[DEFAULT]');

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
            <Box flex={1} alignItems="center" display={'flex'}>
                <Box w={'full'}
                    p={8}
                    mt={1}
                    mx={'auto'}
                    border={['none', '1px']}
                    borderColor={['', 'gray.300']}
                    borderRadius={10}
                    bg={['', 'white']}
                >
                    <VStack spacing={3} w='full' align={['flex-start', 'center']}  >
                        <Heading as='h2'>Welcome To BuidCV App</Heading>
                        <Box>
                            {AccessAreaButtons}
                        </Box>
                    </VStack>
                </Box>
            </Box>

            <Box w={'full'} bg='transparent'><FooterContainer /></Box>
        </VStack>
    );
};

export default Welcome;
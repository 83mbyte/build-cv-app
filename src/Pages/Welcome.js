import { Box, Button, ButtonGroup, VStack, Heading } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import WhiteboxCenter from '../components/Wrappers/WhiteboxCenter';

const Welcome_beta = () => {

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
        AccessAreaButtons = <ButtonGroup variant={'solid'} colorScheme={'teal'} spacing={4}>
            <Button onClick={() => navigate('/login')}>Login</Button>
            <Button onClick={() => navigate('/signup')}> Register</Button>
        </ButtonGroup >
    }
    return (

        <WhiteboxCenter>
            <VStack spacing={3} w='full' align={['flex-start', 'center']}  >
                <Heading as='h2'>Welcome To BuildCV App</Heading>
                <Box>
                    {AccessAreaButtons}
                </Box>
            </VStack>
        </WhiteboxCenter>
    );
};

export default Welcome_beta;
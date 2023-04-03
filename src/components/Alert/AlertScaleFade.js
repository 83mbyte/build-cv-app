import { Alert, AlertIcon, Box, ScaleFade } from '@chakra-ui/react';
import React from 'react';

const AlertScaleFade = ({ type, message }) => {
    const sizeBreakPoints = ['sm', 'md'];

    return (
        <Box w={'full'} p={2}  >
            <ScaleFade in >
                <Alert status={type} fontSize={'sm'} rounded={sizeBreakPoints} >
                    <AlertIcon />
                    {message !== '' && message}
                </Alert>
            </ScaleFade>
        </Box>
    );
};

export default AlertScaleFade;
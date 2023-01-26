import { Box, Center, Progress } from '@chakra-ui/react';
import React from 'react';

const SpinnerCustom = ({ height = '2rem' }) => {
    return (

        <Center bg='red' h={height}>
            <Box bg='blue' w={['200px', 'xs', 'lg', '3xl']}>
                <Progress isIndeterminate size='xs' />
            </Box>
        </ Center>
    );
};

export default SpinnerCustom;
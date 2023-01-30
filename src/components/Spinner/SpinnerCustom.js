import { Box, Center, Progress } from '@chakra-ui/react';
import React from 'react';

const SpinnerCustom = ({ height = '2rem' }) => {
    return (

        <Center bg='transparent' h={height}>
            <Box bg='transparent' w={['200px', 'xs', 'lg', '3xl']}>
                <Progress isIndeterminate size='xs' colorScheme={'teal'} />
            </Box>
        </ Center>
    );
};

export default SpinnerCustom;
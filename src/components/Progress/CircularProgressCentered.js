import { Box, CircularProgress } from '@chakra-ui/react';
import React from 'react';

const CircularProgressCentered = () => {
    return (
        <Box alignItems={'center'} justifyContent={'center'} display="flex" bg='' flexDirection={'column'} h={'100%'}>
            <CircularProgress isIndeterminate color='teal.300' thickness={'4px'} size={['50px', '85px']} />
        </Box>
    );
};

export default CircularProgressCentered;
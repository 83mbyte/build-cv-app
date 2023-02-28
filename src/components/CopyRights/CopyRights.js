import { Box, Text } from '@chakra-ui/react';
import React from 'react';


const CopyRights = () => {
    return (
        <Box m={'60px auto'} justifyContent={'center'} display="flex">
            <Text fontSize={'11px'} color={'gray.400'}>&copy; 2023. IntroduceMe. All Rights Reserved.</Text>
        </Box>
    );
};

export default CopyRights;
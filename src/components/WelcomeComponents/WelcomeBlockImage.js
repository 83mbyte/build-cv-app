import { Box } from '@chakra-ui/react';
import React from 'react';

const WelcomeBlockImage = ({ imgName }) => {
    return (

        <Box
            bg='transparent'
            w='full'
            py={'0'}
            px={0}
            h={'250px'}
            mb={-10}
            borderBottomWidth={'0px'}
            borderColor={'gray.300'}
            borderLeft={'none'}
            borderRight={'none'}
            justifyContent={'center'}
            display={'flex'}
            backgroundRepeat={'no-repeat'}
            backgroundPosition={'bottom'}
            backgroundSize={'contain'}
            backgroundImage={`url(/${imgName})`}
        >
        </Box>
    );
};

export default WelcomeBlockImage;
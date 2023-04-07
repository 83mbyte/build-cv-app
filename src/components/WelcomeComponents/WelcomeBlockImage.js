import { Box } from '@chakra-ui/react';
import React from 'react';

const WelcomeBlockImage = () => {
    return (

        <Box
            bg='white'
            w='full'
            py={'0'}
            px={0}
            h={'250px'}
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
    );
};

export default WelcomeBlockImage;
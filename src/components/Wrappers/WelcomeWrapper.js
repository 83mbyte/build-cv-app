import { Box, VStack } from '@chakra-ui/react';
import React from 'react';

import { useInView } from 'framer-motion';

const WelcomeWrapper = ({ bgColor = 'white', textColor = 'black', firstPosition = false, children }) => {

    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <Box
            bg={firstPosition && !isInView ? 'transparent' : bgColor}
            w='full'
            py={10}
            px={1}
            mx={2}
            borderBottomWidth={'1px'}
            borderColor={'gray.300'}
            borderLeft={'none'}
            borderRight={'none'}
            justifyContent={'center'}
            display={'flex'}
            flexDirection={'column'}
            ref={ref}
            height={firstPosition && !isInView ? '100vh' : ''}
        >
            <VStack bg={''} w={['full', 'xl', '2xl']} mx={'auto'} spacing={5} px={[3, 2]} textColor={textColor}  >
                {isInView && children}
            </VStack>
        </Box>
    );
};

export default WelcomeWrapper;
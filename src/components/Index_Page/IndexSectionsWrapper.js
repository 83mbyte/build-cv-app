import { Box, VStack } from '@chakra-ui/react';
import React from 'react';

const IndexSectionsWrapper = ({ bgColor = 'white', textColor = 'black', firstPosition = false, children }) => {
    return (
        <Box backgroundColor={bgColor}
            w='full'
            py={10}
            px={1}
            mx={0}
            borderBottomWidth={'1px'}
            borderColor={'gray.300'}
            borderLeft={'none'}
            borderRight={'none'}
            justifyContent={'center'}
            display={'flex'}
            flexDirection={'column'}

        >
            <VStack bg={''} w={['full', 'xl', '2xl']} mx={'auto'} spacing={5} px={[3, 2]} textColor={textColor}>

                {children}
            </VStack>
        </Box>
    );
};

export default IndexSectionsWrapper;
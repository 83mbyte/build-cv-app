
import { Box, VStack } from '@chakra-ui/react';

const SectionContainer = ({ sectionId, bgColor = 'white', textColor = 'black', useGradient = false, children }) => {

    let containerOptions;
    if (useGradient) {
        containerOptions = {
            bgGradient: 'to-b',
            gradientFrom: `${bgColor}.500`,
            gradientTo: `${bgColor}.600`
        }
    } else {
        containerOptions = {
            backgroundColor: bgColor,
        }
    }

    return (
        <Box as='section' id={sectionId}
            width={'full'}
            {...containerOptions}

            py={['5', '10']}
            px={0}
            mx={0}
            borderBottomWidth={'1px'}
            borderColor={'gray.300'}
            borderLeft={'none'}
            borderRight={'none'}
            justifyContent={'center'}
            display={'flex'}
        >
            <VStack bg={''} w={['full', 'xl', '2xl']} mx={'auto'} gap={'10'} px={[3, 2]} color={textColor}>
                {children}
            </VStack>
        </Box>
    );
};

export default SectionContainer;
import { Box, Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import React from 'react';

const SectionContainer = ({ children, headingTxt, type, flexDirect = 'row' }) => {
    const switchLayout = () => {
        switch (type) {
            case 'grid':
                return (
                    <SimpleGrid columns={[1, 1, 2]} py='2'>
                        {children}
                    </SimpleGrid>
                )
            case 'flex':
                return (
                    <Flex py='2' direction={flexDirect}>
                        {children}
                    </Flex>
                )
            default:
                break;
        }
    }

    return (
        <Box as='section' px='3' py='3' w='100%' maxW='1024px'  >
            <Heading as='h3' size={['sm', 'sm', 'md']}>{headingTxt}</Heading>
            {
                switchLayout()
            }
        </Box>
    );
};

export default SectionContainer;
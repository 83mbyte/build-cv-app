import { Box, Heading, Flex, SimpleGrid, } from "@chakra-ui/react";
import React from "react";

const SectionWrapper = ({ sectionTitle, type = 'flex', flexDirect = 'row', children }) => {
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
        <Box as='section' p={5} w='100%'>
            <Heading as='h3' size={['sm', 'md', 'md']} pb={0}>{sectionTitle}</Heading>
            {
                switchLayout()
            }
        </Box>
    )
}

export default SectionWrapper;
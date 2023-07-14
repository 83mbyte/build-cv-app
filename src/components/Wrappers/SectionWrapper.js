import { Box, Heading, Flex, SimpleGrid, HStack } from "@chakra-ui/react";
import React from "react";
import ToolTip from "../Tooltip/ToolTip";
import { HideIcon } from "../Icons/Icon";

const SectionWrapper = ({ sectionTitle, type = 'flex', flexDirect = 'row', isHiding = false, hidingClickHandler, children }) => {
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
        <Box as='section' p={[2, 5]} w='100%' bg='white' overflow={'auto'} h="100%">
            <HStack spacing={2} >
                <Heading as='h3' size={['sm', 'md', 'md']} pb={0}>{sectionTitle}</Heading>
                {
                    isHiding &&
                    <Box onClick={hidingClickHandler}>
                        <ToolTip label={'hide section'}>
                            <HideIcon />
                        </ToolTip>
                    </Box>
                }
            </HStack>
            {
                switchLayout()
            }
        </Box>
    )
}

export default SectionWrapper;
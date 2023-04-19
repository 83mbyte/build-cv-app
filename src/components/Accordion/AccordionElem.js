import React from 'react';
import {
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Box, Flex,
} from '@chakra-ui/react';
import ToolTip from '../Tooltip/ToolTip';
import { ExpandIcon, RemoveIcon } from '../Icons/Icon';

const AccordionElem = ({ index, title, descr = null, removeItem, children }) => {
    const capitalizeString = (str) => {
        let arrStr = str.split(' ');
        for (let x = 0; x < arrStr.length; x++) {
            arrStr[x] = arrStr[x].charAt(0).toUpperCase() + arrStr[x].slice(1);
        }
        let result = arrStr.join(' ');
        return result;
    }
    return (
        <AccordionItem border={'1px solid'}
            borderColor={'gray.200'}
            borderRadius={"5px"}
            mb={4}
            mx={2}
        >
            {
                ({ isExpanded }) => (
                    <>
                        <h2>
                            <AccordionButton
                                _hover={{ color: 'teal.500' }}
                                color={isExpanded ? 'teal.500' : 'gray.200'}
                            >
                                <Box textAlign={'left'} flex={1}>
                                    <Box
                                        color={'black'}
                                        _hover={{ color: 'inherit' }}
                                        fontSize={['sm', 'sm', 'md']}
                                    >
                                        {
                                            title && title !== '' && title !== ' '
                                                ? capitalizeString(title)
                                                : `(Not specified)`
                                        }
                                    </Box>
                                    {
                                        descr &&
                                        <Box fontSize={'xs'} color={'gray.500'}>
                                            {descr}
                                        </Box>
                                    }
                                </Box>
                                <Flex columnGap={'15px'} alignItems={'center'}   >

                                    <Box
                                        onClick={(e) => removeItem(e)}
                                    >
                                        <ToolTip label='remove' type='warning'>
                                            <RemoveIcon />
                                        </ToolTip>
                                    </Box>
                                    <ToolTip label={isExpanded ? 'show less' : 'show more'}>
                                        <ExpandIcon isExpanded={isExpanded} />
                                    </ToolTip>
                                </Flex>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>

                            {children}

                        </AccordionPanel>
                    </>
                )
            }
        </AccordionItem>
    );
};

export default AccordionElem;
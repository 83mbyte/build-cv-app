
import React from 'react';
import IndexSectionsWrapper from './IndexSectionsWrapper';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box, Heading } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import ToolTip from '../ToolTip/ToolTip';
import { animationVariants } from '../Animation/animationVariants';
import { ExpandIcon } from '../Icons/Icon';
import { indexData } from '@/lib/content-lib';

const faqData = [
    { q: indexData?.faq?.one?.q || 'Lamet consectetur adipisicing elit. Assumenda, quorem?', a: indexData?.faq?.one?.a || `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, eum magnam sapiente repudiandae id vitae rerum iure!` },
    { q: indexData?.faq?.two?.q || 'Lamet consectetur adipisicing elit. Assumenda, quorem?', a: indexData?.faq?.two?.a || `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, eum magnam sapiente repudiandae id vitae rerum iure!` },
    { q: indexData?.faq?.three?.q || 'Lamet consectetur adipisicing elit. Assumenda, quorem?', a: indexData?.faq?.three?.a || `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, eum magnam sapiente repudiandae id vitae rerum iure!` },
];
const itemMotion = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, x: 0 }
}
const IndexFAQElement = () => {
    return (
        <IndexSectionsWrapper>
            <Box bg='' mx={'auto'} w={'full'} display={'flex'}  >
                <Heading as='h2' textAlign={'center'} bg='' size={['xl', 'xl']} mx={'auto'} >
                    Frequently Asked Questions
                </Heading>
            </Box>
            <Accordion
                allowToggle
                allowMultiple={false}
                w='full'
                as={motion.div}
                variants={animationVariants.opacity}
                initial={'initial'}
                whileInView={'animate'}
                viewport={{ once: true }}
            >

                {
                    faqData.map((elem, index) => {
                        return (
                            <AccordionItem border={'1px solid'}
                                key={`faq_${index}`}
                                borderColor={'gray.200'}
                                borderRadius={"5px"}
                                mb={1}
                                as={motion.div}
                                variants={itemMotion}
                            >

                                {
                                    ({ isExpanded }) => (
                                        <>
                                            <Heading as='h2'>
                                                <AccordionButton _hover={{ color: 'teal.500' }}
                                                    color={isExpanded ? 'teal.500' : 'gray.500'}>
                                                    <Box textAlign={'left'} flex={1}>
                                                        <Box
                                                            color={{ color: 'inherit' }}
                                                            _hover={{ color: 'inherit' }}
                                                            fontSize={['sm', 'sm', 'md']}
                                                        >
                                                            {elem.q}
                                                        </Box>
                                                    </Box>
                                                    <Box>
                                                        <ToolTip label={isExpanded ? 'show less' : 'show more'}>
                                                            <ExpandIcon isExpanded={isExpanded} />
                                                        </ToolTip>
                                                    </Box>

                                                </AccordionButton>
                                            </Heading>
                                            <AccordionPanel pb={4}>
                                                {elem.a}
                                            </AccordionPanel>
                                        </>
                                    )
                                }
                            </AccordionItem>
                        )
                    })
                }

            </Accordion>
        </IndexSectionsWrapper>
    );
};

export default IndexFAQElement;
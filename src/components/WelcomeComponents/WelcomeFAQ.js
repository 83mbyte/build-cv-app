import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box, Heading } from '@chakra-ui/react';
import React from 'react';
import { motion } from "framer-motion";

import WelcomeWrapper from '../Wrappers/WelcomeWrapper';
import ToolTip from '../Tooltip/Tooltip';
import { ExpandIcon } from '../Icons/Icon';

const WelcomeFAQ = () => {
    const faqData = [
        { q: `How can I customize my resume?`, a: `Our resume templates are designed to adapt to your content and look great across all of our designs.` },
        { q: `How do I change my resume template or design?`, a: `Buildcv.app offers several different design themes/templates. All of our themes work with your resume content so you do not have to worry about changing your content to fit each design. Once you create your resume you can change the design or template in a snap.` },
        { q: `How do I preview mu resume?`, a: `As you start adding content to your resume, you can preview your document in the template anytime on the preview window. Your edits are reflected in the preview in real-time.` }
    ];
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { delay: 0.3, delayChildren: 0.9, staggerChildren: 0.8, staggerDirection: -1, duration: 0.8 }
        }
    }

    const itemMotion = {
        hidden: { opacity: 0, y: 100 },
        show: { opacity: 1, y: 0 }
    }
    return (
        <WelcomeWrapper >
            <Box bg='' mx={'auto'} w={'full'} display={'flex'}  >
                <Heading as='h2' textAlign={'center'} bg='' size={['xl', 'xl']} mx={'auto'} >
                    Frequently Asked Questions
                </Heading>
            </Box>
            <Accordion allowToggle allowMultiple={false}
                w='full'
                as={motion.div}
                variants={container}
                initial={'hidden'}
                whileInView={'show'}
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
                                            <h2>
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
                                            </h2>
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
        </WelcomeWrapper>
    );
};

export default WelcomeFAQ;
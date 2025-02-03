
import { useState } from "react";
import { Text, VStack, Heading, Box, Accordion, Icon } from "@chakra-ui/react";
import { motion } from "motion/react";

import { indexData } from '@/lib/content-lib';
import { LuChevronDown } from "react-icons/lu";
import SectionContainer from '../SectionContainer';

const faqData = [
    { q: indexData?.faq?.one?.q || 'Lamet consectetur adipisicing elit. Assumenda, quorem?', a: indexData?.faq?.one?.a || `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, eum magnam sapiente repudiandae id vitae rerum iure!` },
    { q: indexData?.faq?.two?.q || 'Lamet consectetur adipisicing elit. Assumenda, quorem?', a: indexData?.faq?.two?.a || `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, eum magnam sapiente repudiandae id vitae rerum iure!` },
    { q: indexData?.faq?.three?.q || 'Lamet consectetur adipisicing elit. Assumenda, quorem?', a: indexData?.faq?.three?.a || `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, eum magnam sapiente repudiandae id vitae rerum iure!` },
    { q: indexData?.faq?.four?.q || 'Lamet consectetur adipisicing elit. Assumenda, quorem?', a: indexData?.faq?.four?.a || `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, eum magnam sapiente repudiandae id vitae rerum iure!` },
];

const FAQ = () => {
    const [active, setActive] = useState([])
    return (
        <SectionContainer sectionId={'sectionFAQ'} bgColor='white'>
            <VStack paddingX={[1, 3]} justifyContent={'center'} gap={6} bg='' w='full'>
                <motion.div
                    initial={{ opacity: 0, }}
                    whileInView={{ opacity: 1, transition: { duration: 0.8, delay: 0.2 } }}
                // viewport={{ once: true }}
                >
                    <Heading as='h2' textAlign={'center'} bg='' size={['xl', '3xl']} mx={'auto'} >
                        Frequently Asked Questions
                    </Heading>
                </motion.div>

                <Accordion.Root collapsible bg='' width={'full'} variant={'subtle'} multiple={true} defaultValue={active} onValueChange={(e) => setActive(e.value)}>
                    {faqData.map((item, index) => (
                        <Accordion.Item key={index} value={index} marginTop={'3'} >
                            <Accordion.ItemTrigger textAlign={'left'} fontSize={['sm', 'md']} cursor={'pointer'} _hover={{ color: 'teal' }}>
                                <Box display={'flex'} justifyContent={'space-between'} w='full'>
                                    {index + 1}) {item.q}
                                    <Box>
                                        <Icon>
                                            <LuChevronDown style={{
                                                transform: active.findIndex((item) => item == index) != -1 ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.4s ease'
                                            }} />
                                        </Icon>
                                    </Box>
                                </Box>
                                <Accordion.ItemIndicator />
                            </Accordion.ItemTrigger>
                            <Accordion.ItemContent >
                                <Accordion.ItemBody padding={'2'} >
                                    <Text textAlign={'left'} fontSize={['sm', 'md']}>
                                        {item.a}
                                    </Text>
                                </Accordion.ItemBody>
                            </Accordion.ItemContent>
                        </Accordion.Item>
                    ))}
                </Accordion.Root>
            </VStack>

        </SectionContainer>
    );
};

export default FAQ;
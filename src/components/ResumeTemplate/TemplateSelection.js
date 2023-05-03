import { Wrap, WrapItem, VStack, Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTemplate } from '../../redux/features/templates/templatesSlice';
import { motion } from 'framer-motion';

const TemplateSelection = () => {
    const dispatch = useDispatch();
    const templatesVars = useSelector(state => state.templates.data.variants);
    const selected = useSelector(state => state.templates.data.selected);

    const onClickHandler = (data) => {
        dispatch(setSelectedTemplate(data));
    }
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { delay: 0.3, delayChildren: 0.9, staggerChildren: 0.8, staggerDirection: 1, duration: 0.8 }
        }
    }

    const itemMotion = {
        hidden: { opacity: 0, y: 0 },
        show: { opacity: 1, y: 0 }
    }
    return (
        <>
            <Wrap justify={'space-around'} my={1} name='testName'  >
                {
                    templatesVars.map((item, index) => {
                        return (
                            <WrapItem
                                key={`template_${item.label}`}
                                p={2}
                                border={'1px solid gray'}
                                borderRadius={4}
                                transition={'all 0.8s'}
                                backgroundColor={selected === item.label ? 'teal' : 'white'}
                                color={selected === item.label && 'white'}
                                _hover={{ cursor: 'pointer', backgroundColor: 'teal', color: 'white' }}
                                onClick={() => onClickHandler(item.label)}
                            >
                                <VStack spacing={0} >
                                    <Box>{item.label}</Box>
                                    <Box>
                                        <img src={item.img} alt={item.label} />
                                    </Box>
                                </VStack>
                            </WrapItem>
                        )
                    })
                }
            </Wrap>
            <Box textAlign={'center'} pt={5} w={'45%'} bg='' mx={'auto'} my={5} as={motion.div}
                variants={container}
                initial={'hidden'}
                whileInView={'show'}
                viewport={{ once: true }}
            >
                <Text fontSize={'md'} as={motion.p} variants={itemMotion}>
                    We are still working on templates creation..
                </Text>
                <Text fontSize={'md'} as={motion.p} variants={itemMotion}>
                    More variants will be ready soon.
                </Text>
            </Box>
        </>
    );
};

export default TemplateSelection;
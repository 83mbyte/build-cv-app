import React, { useRef } from 'react';
import { Box, HStack, Tabs, TabList, TabPanels, Tab, TabPanel, VStack, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import html2pdf from 'html2pdf.js/dist/html2pdf.min';

import Backdrop from './Backdrop';
import { CloseIcon } from '../Icons/Icon';
import TemplateSelection from '../ResumeTemplate/TemplateSelection';
import TemplatePreview from '../ResumeTemplate/TemplatePreview';

const animationType = {
    newspaper: {
        hidden: {
            transform: "scale(0) rotate(290deg)",
            opacity: 0,
            transition: {
                delay: 0,
            },
        },
        visible: {
            transform: " scale(1) rotate(0deg)",
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },

        exit: {
            transform: "scale(2) rotate(-90deg)",
            opacity: 1,
            transition: {
                duration: 0.3,
            },
        },
    },
    dropIn: {
        hidden: {
            y: "-100vh",
            opacity: 0,
        },
        visible: {
            y: "0",
            opacity: 1,
            transition: {
                duration: 0.8,
                type: 'spring',
                damping: 20,
                stiffness: 500,
            },
        },
        exit: {
            y: "100vh",
            opacity: 0.5,
            transition: {
                duration: 1,
            },
        },
    }
}

const ModalAnimated = ({ handleClose }) => {
    const htmlRef = useRef(null);
    const getPdf = () => {
        let opt = {
            margin: [15, 1],
            pagebreak: {
                avoid: ['#details', '#links', '#skills', '#lang', '#hobbies', '#profile', '#education', '#courses', '#employment', '#references']
            },
            filename: "resume.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 3 },
            jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
        };
        console.log('generating document..')
        html2pdf(htmlRef.current, opt);
    }

    return (
        <Backdrop>
            <Box as={motion.div} bg='white' width={['full', '75%']}
                onClick={(e) => e.stopPropagation()}
                p={1}
                borderRadius={'md'}
                variants={animationType.newspaper}
                initial="hidden"
                animate="visible"
                exit="exit"
                display={'flex'}
                flexDirection={'column'}
            >
                <VStack w='full' align={'flex-end'} spacing={0}  >
                    <HStack pb={'2px'}>
                        {/* <Box >
                            <Button size={'xs'} colorScheme={'teal'} variant={'ghost'} onClick={getPdf}>Get PDF</Button>
                        </Box> */}
                        <Box onClick={handleClose}>
                            <CloseIcon />
                        </Box>
                    </HStack>
                </VStack>
                <Tabs isFitted w='full' flex={1} display="flex" flexDirection={'column'} colorScheme={'teal'} isLazy variant='enclosed-colored' size={'sm'}  >
                    <TabList onClick={(e) => e.stopPropagation()} >
                        <Tab fontSize={'sm'} >Templates</Tab>
                        <Tab fontSize={'sm'} >Preview</Tab>
                    </TabList>

                    <TabPanels display={'flex'} flex={1} py={1} >

                        <TabPanel bg='white' w="full" onClick={(e) => e.stopPropagation()} p={0} m={0} >
                            <Box overflowY='scroll' h={'md'}>
                                <TemplateSelection />
                            </Box>
                        </TabPanel>
                        <TabPanel w="full" onClick={(e) => e.stopPropagation()} p={0} m={0}>
                            <Box overflowY='scroll' h={'lg'}>
                                <TemplatePreview ref={htmlRef} />
                            </Box>
                        </TabPanel>

                    </TabPanels>
                </Tabs>
            </Box>
        </Backdrop>
    );
};


export default ModalAnimated;
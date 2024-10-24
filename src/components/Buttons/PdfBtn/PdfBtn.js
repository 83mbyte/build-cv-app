import { Box, IconButton } from '@chakra-ui/react';
import React from 'react';
import { BsFiletypePdf } from "react-icons/bs";
import styles from './PdfBtn.module.css';
import { motion } from 'framer-motion';

const animationType = {
    newspaper: {
        hidden: {
            transform: "scale(0) rotate(720deg)",
            opacity: 0,
            transition: {
                // delay: 5,
            },
        },
        visible: {
            transform: " scale(1) rotate(0deg)",
            opacity: 1,
            transition: {
                duration: 2,
                delay: 1,
            },
        },
        exit: {
            transform: "scale(0) rotate(-720deg)",
            opacity: 0,
            transition: {
                duration: 0.3,
            },
        },
    },
}

const PdfBtn = ({ onClickAction }) => {
    return (
        <Box className={styles.pdfBtnContainer} onClick={onClickAction} as={motion.div}
            variants={animationType.newspaper}
            initial="hidden"
            animate="visible"
            exit="exit"
        >

            <IconButton
                variant='solid'
                colorScheme='teal'
                aria-label='Export to PDF'
                fontSize='30px'
                size={'md'}
                icon={<BsFiletypePdf />}
            />
        </Box>
    );
};

export default PdfBtn;
import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import { BsFiletypePdf, BsCart2 } from "react-icons/bs";
import styles from './PdfBtn.module.css';
import { motion } from 'motion/react';;
import { animationVariants } from '@/components/Animation/animationVariants';

const PdfBtn = ({ onClickAction, isAllowed }) => {
    return (
        <Box className={styles.pdfBtnContainer} onClick={onClickAction} as={motion.div}
            variants={animationVariants.slideX}
            // variants={animationType.newspaper}
            initial="initial"
            animate="animate"
            exit="exit"
        // paddingBottom={[10, 0]}
        >
            {
                !isAllowed
                    ? <Button
                        variant='solid'
                        colorScheme='teal'
                        aria-label='buy pdf'
                        // fontSize='30px'
                        size={['sm', 'md']}
                        leftIcon={<BsCart2 />}
                    >Buy just for $1.50</Button>

                    :
                    <Button
                        variant='solid'
                        colorScheme='teal'
                        aria-label='buy pdf'
                        // fontSize='30px'
                        size={['sm', 'md']}
                        leftIcon={<BsFiletypePdf />}
                    >Export to PDF</Button>
            }
        </Box>
    );
};

export default PdfBtn;
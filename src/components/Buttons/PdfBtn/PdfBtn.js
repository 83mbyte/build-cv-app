import { Box, Button, IconButton } from '@chakra-ui/react';
import React from 'react';
import { BsFiletypePdf, BsCart2 } from "react-icons/bs";
import styles from './PdfBtn.module.css';
import { motion } from 'framer-motion';
import { animationVariants } from '@/components/Animation/animationVariants';
// const animationType = {
//     newspaper: {
//         hidden: {
//             transform: "scale(0) rotate(720deg)",
//             opacity: 0,
//             transition: {
//                 // delay: 5,
//             },
//         },
//         visible: {
//             transform: " scale(1) rotate(0deg)",
//             opacity: 1,
//             transition: {
//                 duration: 2,
//                 delay: 1,
//             },
//         },
//         exit: {
//             transform: "scale(0) rotate(-720deg)",
//             opacity: 0,
//             transition: {
//                 duration: 0.3,
//             },
//         },
//     },
// }

const PdfBtn = ({ onClickAction, isAllowed }) => {
    return (
        <Box className={styles.pdfBtnContainer} onClick={onClickAction} as={motion.div}
            variants={animationVariants.slideX}
            // variants={animationType.newspaper}
            initial="initial"
            animate="animate"
            exit="exit"
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
                // <IconButton
                //     variant='solid'
                //     colorScheme='teal'
                //     aria-label='Export to PDF'
                //     fontSize='30px'
                //     size={'md'}
                //     icon={<BsFiletypePdf />}
                // />
            }
        </Box>
    );
};

export default PdfBtn;
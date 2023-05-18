import React from 'react';
import { Box } from "@chakra-ui/react";
import { IconContext } from "react-icons";

import { FaPencilAlt, FaEyeSlash } from "react-icons/fa";
import { MdDelete, MdExpandMore, MdClose } from 'react-icons/md';
import styles from './IconStyles.module.css';



export const PencilIcon = () => {

    return (
        <IconContext.Provider value={{ className: `${styles.icon}` }} >
            <Box height={['18px', '24px']} w={['18px', '24px']} p={0} >
                <FaPencilAlt />
            </Box >
        </IconContext.Provider >
    )
}

export const CloseIcon = () => {

    return (
        <IconContext.Provider value={{ className: `${styles.icon}` }} >
            <Box _hover={{ color: 'teal', cursor: 'pointer' }} color={'gray.400'} height={['18px', '24px']} w={['18px', '24px']} p={0}>
                <MdClose />
            </Box >
        </IconContext.Provider >
    )
}

export const RemoveIcon = () => {
    return (
        <IconContext.Provider value={{ className: `${styles.icon} ${styles.red}` }} >
            <Box height={['18px', '24px']} w={['18px', '24px']} p={0}>
                <MdDelete />
            </Box >
        </IconContext.Provider >
    )
}

export const ExpandIcon = ({ isExpanded }) => {

    return (
        <IconContext.Provider value={{ className: isExpanded ? `${styles.icon} ${styles.expanded}` : `${styles.icon}` }} >
            <Box height={['18px', '24px']} w={['18px', '24px']} p={0}>
                <MdExpandMore />
            </Box >
        </IconContext.Provider >
    )
}

export const HideIcon = () => {

    return (
        <IconContext.Provider value={{ className: `${styles.icon}` }} >
            <Box _hover={{ color: 'teal', cursor: 'pointer' }} color={'gray.200'} height={['18x', '24px']} w={['18px', '24px']} p={0}>
                <FaEyeSlash />
            </Box >
        </IconContext.Provider >
    )
}
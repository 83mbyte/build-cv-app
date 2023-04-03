import React from 'react';
import { Box } from "@chakra-ui/react";
import { IconContext } from "react-icons";

import { FaPencilAlt } from "react-icons/fa";
import { MdDelete, MdExpandMore, MdClose } from 'react-icons/md';
import styles from './IconStyles.module.css';



export const PencilIcon = () => {

    return (
        <IconContext.Provider value={{ className: `${styles.icon}` }} >
            <Box >
                <FaPencilAlt />
            </Box >
        </IconContext.Provider >
    )
}

export const CloseIcon = () => {

    return (
        <IconContext.Provider value={{ className: `${styles.icon}` }} >
            <Box _hover={{ color: 'teal', cursor: 'pointer' }} color={'gray.200'}>
                <MdClose />
            </Box >
        </IconContext.Provider >
    )
}

export const RemoveIcon = () => {
    return (
        <IconContext.Provider value={{ className: `${styles.icon} ${styles.red}` }} >
            <Box>
                <MdDelete />
            </Box >
        </IconContext.Provider >
    )
}

export const ExpandIcon = ({ isExpanded }) => {

    return (
        <IconContext.Provider value={{ className: isExpanded ? `${styles.icon} ${styles.expanded}` : `${styles.icon}` }} >
            <Box>
                <MdExpandMore />
            </Box >
        </IconContext.Provider >
    )
}
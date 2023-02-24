import { Box } from "@chakra-ui/react";
import { IconContext } from "react-icons";
import { MdDelete, MdExpandMore, MdClose } from 'react-icons/md';
import { VscFilePdf } from 'react-icons/vsc';
import { FaPencilAlt } from "react-icons/fa";
import React from "react";
import './Icon.css';


export const RemoveIcon = ({ isExpanded }) => {
    return (

        <IconContext.Provider value={{ className: 'icon red' }} >
            <Box>

                <MdDelete />
            </Box >
        </IconContext.Provider >
    )
}

export const ExpandIcon = ({ isExpanded }) => {

    return (
        <IconContext.Provider value={{ className: isExpanded ? 'icon expanded' : 'icon' }} >
            <Box>

                <MdExpandMore />
            </Box >
        </IconContext.Provider >
    )
}

export const CloseIcon = () => {

    return (
        <IconContext.Provider value={{ className: 'icon' }} >
            <Box _hover={{ color: 'teal', cursor: 'pointer' }} color={'gray.200'}>

                <MdClose />
            </Box >
        </IconContext.Provider >
    )
}

export const PdfIcon = () => {

    return (
        <IconContext.Provider value={{ className: 'icon' }} >
            <Box _hover={{ color: 'teal', cursor: 'pointer' }} color={'gray.200'} >

                <VscFilePdf />
            </Box >
        </IconContext.Provider >
    )
}

export const PencilIcon = () => {

    return (
        <IconContext.Provider value={{ className: 'icon' }} >
            <Box >

                <FaPencilAlt />
            </Box >
        </IconContext.Provider >
    )
}


// export const DragIcon = () => {
//     return (
//         <div className="icon grab">
//             <svg width="24px" height="24px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#E2E8F0" stroke="#E2E8F0" strokeWidth="0"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> </g> <g id="Layer_7" data-name="Layer 7"> <g> <circle cx="18" cy="12" r="4"></circle> <circle cx="18" cy="24" r="4"></circle> <circle cx="18" cy="36" r="4"></circle> <circle cx="30" cy="12" r="4"></circle> <circle cx="30" cy="24" r="4"></circle> <circle cx="30" cy="36" r="4"></circle> </g> </g> </g> </g></svg>
//         </div>
//     )
// }

// export const MoreIcon = () => {
//     return (
//         <div className="icon pointer">
//             <svg width="24px" height="24px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#E2E8F0" stroke="#E2E8F0" strokeWidth="0"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>more-horizontal-solid</title> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> </g> <g id="icons_Q2" data-name="icons Q2"> <g> <circle cx="8" cy="24" r="5"></circle> <circle cx="24" cy="24" r="5"></circle> <circle cx="40" cy="24" r="5"></circle> </g> </g> </g> </g></svg>
//         </div>
//     )
// }



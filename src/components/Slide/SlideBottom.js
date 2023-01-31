import { Slide } from '@chakra-ui/react';
import React from 'react';


const SlideBottom = ({ children, show }) => {

    return (
        <Slide direction='bottom' in={show} style={{ zIndex: 10 }} unmountOnExit={true}>
            {children}
        </Slide >

    )
}

export default SlideBottom;
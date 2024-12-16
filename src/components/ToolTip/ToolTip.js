
import React, { forwardRef } from 'react';
import { Box, Tooltip } from '@chakra-ui/react';

const ToolTip = ({ children, label, type = 'default', isDisabled }) => {
    const colors = {
        default: 'teal',
        warning: 'red',
    }
    return (
        <Tooltip label={label} hasArrow bg={`${colors[type]}.600`} closeOnClick={true} placement='top-end' isDisabled={isDisabled} aria-label={label} >
            <TooltipItem>{children}</TooltipItem>
        </Tooltip>
    );
};

export default ToolTip;

const TooltipItem = forwardRef(function TooltipItemRef({ children, ...rest }, ref) {
    return (
        <Box ref={ref} {...rest} >
            {children}
        </Box >
    )
})


import { Box, Tooltip } from '@chakra-ui/react';
import React, { forwardRef } from 'react';

const ToolTip = ({ children, label, type = 'default', isDisabled }) => {
    const colors = {
        default: 'teal',
        warning: 'red',
    }
    return (
        <Tooltip label={label} hasArrow bg={`${colors[type]}.600`} placement='top-end' closeOnClick={true} isDisabled={isDisabled} >
            <TooltipItem>{children}</TooltipItem>
        </Tooltip>
    );
};

export default ToolTip;

const TooltipItem = forwardRef(({ children, ...rest }, ref) => (
    <Box ref={ref} {...rest} >
        {children}
    </Box>
))
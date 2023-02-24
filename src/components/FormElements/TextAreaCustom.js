import { Box, FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import React, { createRef } from 'react';
import DOMPurify from 'dompurify';

const TextAreaCustom = ({ data, handleInputChange }) => {
    const inputRef = createRef();
    const sanitizeInput = ((data) => {
        return DOMPurify.sanitize(data);
    });

    return (
        <Box my='3' w={'100%'} px='8px' minW={'200px'}  >
            <FormControl variant={'floating'}>
                <Textarea
                    ref={inputRef}
                    placeholder=' '
                    value={data.value}
                    onChange={() => handleInputChange(sanitizeInput(inputRef.current.value))}
                    //onChange={() => handleInputChange(inputRef.current.value)}
                    _focusVisible={{ 'boxShadow': 'none' }}
                    resize={'none'}
                    size={['xs', 'md', 'md']}
                />
                <FormLabel fontSize={['xs', 'md', 'md']}>{'What do you like?'}</FormLabel>
            </FormControl>
        </Box>
    );
};

export default TextAreaCustom;

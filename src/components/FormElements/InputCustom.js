import { Box, FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';
import React, { useRef } from 'react';


const InputCustom = ({ labelText, defValue, path, required = false, handleInputChange }) => {
    const isError = defValue === '';
    const inputRef = useRef(null);
    const ARRAYSIZE = ['xs', 'md', 'md'];

    return (

        <Box p={2}>
            <FormControl variant={'floating'} isRequired={required} isInvalid={isError && required} >

                <Input
                    size={ARRAYSIZE}
                    value={defValue}
                    onChange={() => handleInputChange(path, inputRef.current.value)}
                    ref={inputRef}
                    bg="white"
                    placeholder=" "
                    _focusVisible={{ 'boxShadow': 'none' }}
                />
                <FormLabel fontSize={ARRAYSIZE}>{labelText}</FormLabel>
                {isError && (
                    <FormErrorMessage>Can't be empty.</FormErrorMessage>
                )}
            </FormControl>
        </Box >
    );
};

export default InputCustom;
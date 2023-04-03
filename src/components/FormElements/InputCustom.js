
import React, { useRef } from 'react';
import { Box, FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';

const InputCustom = ({ name, onChangeCallback, inputValue = '', labelText = '', required = false, disabled = false, type = 'text', errorMessage = `Can't be empty.` }) => {

    const isError = inputValue === '';
    const inputRef = useRef(null);
    const ARRAYSIZE = ['xs', 'md', 'md'];


    return (
        <Box p={2} w='full'>
            <FormControl variant={'floating'} isRequired={required} isInvalid={isError && required} >
                <Input
                    size={ARRAYSIZE}
                    value={inputValue}
                    ref={inputRef}
                    onChange={() => onChangeCallback(name, inputRef.current.value)}
                    bg="white"
                    placeholder=" "
                    _focusVisible={{ 'boxShadow': 'none' }}
                    disabled={disabled}
                    type={type}
                    name={name}
                />
                <FormLabel fontSize={ARRAYSIZE}>{labelText}</FormLabel>
                {isError && (
                    <FormErrorMessage>{errorMessage}</FormErrorMessage>
                )}
            </FormControl>
        </Box>
    );
};

export default InputCustom;
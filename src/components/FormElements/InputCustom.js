import { Box, FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { fetchAPI } from '../../API/api';

const InputCustom = ({ labelText, defValue, path, required = false, user, handleInputChange }) => {
    const isError = defValue === '';
    const inputRef = useRef(null);
    const ARRAYSIZE = ['xs', 'md', 'md'];

    return (

        <Box p={2}>
            <FormControl variant={'floating'} isRequired={required} isInvalid={isError && required} >

                <Input
                    size={ARRAYSIZE}
                    value={defValue}
                    onChange={() => handleInputChange(inputRef, path)}
                    ref={inputRef}
                    //onBlur={applyChanges}
                    bg="white"
                    placeholder=" "
                    onFocus={() => console.log('focu')}
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
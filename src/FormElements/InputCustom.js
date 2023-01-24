import { Box, FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { fetchAPI } from '../API/api';

const InputCustom = ({ labelText, defValue, path, required = false, user }) => {
    const [value, setValue] = useState(defValue);
    const inputRef = useRef(null);
    const ARRAYSIZE = ['xs', 'md', 'md'];
    const isError = value === '';
    const handleInputChange = (ref) => {
        setValue(ref.current.value)
    }

    const applyChanges = () => {
        fetchAPI.putData(user, path, value)


    }

    return (
        <Box p={2}>
            <FormControl variant={'floating'} isRequired={required} isInvalid={isError && required}>

                <Input
                    size={ARRAYSIZE}
                    value={value}
                    onChange={() => handleInputChange(inputRef)}
                    ref={inputRef}
                    onBlur={applyChanges}
                    bg="white"
                    placeholder=" "
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
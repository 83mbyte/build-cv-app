
import React, { useRef } from 'react';
import {
    Box, FormControl, FormLabel, Input, FormErrorMessage,
} from '@chakra-ui/react';

const InputCustom = ({ name, onChangeCallback, inputValue = '', labelText = '', required = false, disabled = false, type = 'text', errorMessage = `Can't be empty.` }) => {

    const inputRef = useRef(null);
    const ARRAYSIZE = ['xs', 'md', 'md'];

    const [isError, setIsError] = React.useState(false);
    const checkRequired = (value) => {
        if (!value || value === '') {
            setIsError(true)
        } else {
            setIsError(false)
        }
    }
    const validateNumbers = (name, value) => {
        const regex = /[0-9]*/g;
        let tmpstr = value.match(regex);
        onChangeCallback(name, tmpstr.join(''))
    }

    if (type === 'number') {
        return (
            <Box p={2} w='full'>
                <FormControl variant={'floating'} isRequired={required} isInvalid={isError && required} >
                    <Input
                        size={ARRAYSIZE}
                        value={inputValue}
                        ref={inputRef}
                        onChange={() => validateNumbers(name, inputRef.current.value)}
                        bg="white"
                        placeholder=" "
                        _focusVisible={{ 'boxShadow': 'none' }}
                        disabled={disabled}
                        name={name}
                    />
                    <FormLabel fontSize={ARRAYSIZE}>{labelText}</FormLabel>
                    {isError && (
                        <FormErrorMessage>{errorMessage}</FormErrorMessage>
                    )}
                </FormControl>
            </Box>
        );
    }
    else {
        return (
            <Box p={2} w='full'>
                <FormControl variant={'floating'} isRequired={required} isInvalid={isError && required} >
                    <Input
                        size={ARRAYSIZE}
                        value={inputValue}
                        ref={inputRef}
                        onChange={() => {
                            checkRequired(inputRef.current.value)
                            onChangeCallback(name, inputRef.current.value)
                        }
                        }
                        onBlur={() => checkRequired(inputRef.current.value)}
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
    }
};

export default InputCustom;
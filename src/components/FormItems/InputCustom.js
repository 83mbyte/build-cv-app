import { FormControl, Input, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import React, { useRef } from 'react';

const InputCustom = ({ name, labelText = '', inputValue = '', onChangeCallback, required = false, disabled = false, type = 'text', errorMessage = `Can't be empty.` }) => {

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

    return (

        <FormControl variant={'floating'}
            isRequired={required}
            isInvalid={isError && required}

        >
            <Input
                ref={inputRef}
                bg="white"
                size={ARRAYSIZE}
                // value={inputValue}
                placeholder=" "
                _focusVisible={{ 'boxShadow': 'none' }}
                // disabled={disabled}
                type={type}
                name={name}
                autoComplete={'off'}
                // onChange={() => {
                //     checkRequired(inputRef.current.value)
                //     onChangeCallback(name, DOMPurify.sanitize(inputRef.current.value))
                // }
                // }
                onBlur={() => checkRequired(inputRef.current.value)}
            />
            <FormLabel fontSize={ARRAYSIZE}>{labelText}</FormLabel>
            {isError && (
                <FormErrorMessage fontSize={ARRAYSIZE} mb={2}>{errorMessage}</FormErrorMessage>
            )}
        </FormControl>

    );
};

export default InputCustom;
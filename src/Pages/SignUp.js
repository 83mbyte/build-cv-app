import React, { useState } from 'react';
import { Box, Button, Heading, HStack, VStack, Text, } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import InputCustom from '../components/FormElements/InputCustom';
import { clearAuthError, signUpThunk } from '../redux/features/utility/utilitySlice';
import AlertScaleFade from '../components/Alert/AlertScaleFade';
import WhiteboxCenter from '../components/Wrappers/WhiteboxCenter';


const SignUp = () => {
    const sizeBreakPoints = ['sm', 'md'];

    // Remove data (email,pass) from inputsValue
    const [inputsValue, setInputsValue] = useState({ firstName: '', lastName: '', email: process.env.REACT_APP_TEMP_EMAIL, pass: process.env.REACT_APP_TEMP_PASS });
    // Remove data (email,pass) from inputsValue

    const status = useSelector(state => state.utility.auth.status);
    const error = useSelector(state => state.utility.auth.error);
    const successMsg = useSelector(state => state.utility.auth.successMsg);
    const dispatch = useDispatch();

    const clearError = () => {
        dispatch(clearAuthError());
    }
    const applyClickHandler = () => {
        if (inputsValue.email !== '' && inputsValue.pass !== '') {
            dispatch(signUpThunk({ email: inputsValue.email, pass: inputsValue.pass, firstName: inputsValue.firstName, lastName: inputsValue.lastName }))
        } else {
            console.log('data not provided')
        }
    }

    const onChangeInput = (name, value) => {
        if (error !== '' || successMsg !== '') {
            clearError();
        };
        setInputsValue({
            ...inputsValue,
            [name]: value
        });
    }

    return (
        <WhiteboxCenter >
            <VStack spacing={[3, 5]} w='full' align={['flex-start', 'center']}>
                <VStack align={['flex-start', 'center']} w='full'>
                    <Heading as='h2' >SignUp</Heading>
                </VStack>
                <Box w='full'>

                    <InputCustom labelText='First Name' name={'firstName'} inputValue={inputsValue.firstName} onChangeCallback={onChangeInput} disabled={successMsg !== ''} />
                    <InputCustom labelText='Last Name' name={'lastName'} inputValue={inputsValue.lastName} onChangeCallback={onChangeInput} disabled={successMsg !== ''} />

                    <InputCustom labelText='Email' required={true} name={'email'} inputValue={inputsValue.email} onChangeCallback={onChangeInput} disabled={successMsg !== ''} />
                    <InputCustom labelText='Password' type={'password'} name={'pass'} required={true} inputValue={inputsValue.pass} onChangeCallback={onChangeInput} errorMessage={'Must be at least 6 characters long.'} disabled={successMsg !== ''} />
                </Box>
                {
                    (error !== '' || successMsg !== '')
                    && <AlertScaleFade message={error !== '' ? error : successMsg} type={error !== '' ? 'error' : 'success'} />
                }
                <Box p={2} w='full'>
                    <Button
                        w={'full'}
                        colorScheme={'teal'}
                        size={sizeBreakPoints}
                        rounded={sizeBreakPoints}
                        isLoading={status === 'loading'}
                        onClick={applyClickHandler}
                        isDisabled={successMsg !== '' || error !== '' || inputsValue.pass.length < 6}

                    >Apply</Button>
                    <HStack spacing={'-1'} fontSize={'xs'} alignItems={'baseline'} justifyContent={'center'}>
                        <Text>Already registered? Please login</Text>
                        {/* <Button variant={'link'} colorScheme={'teal'} fontSize={'xs'} mx={0} px={0} onClick={toLogin} >here</Button> */}
                        <Button variant={'link'} colorScheme={'teal'} fontSize={'xs'} mx={0} px={0} as={RouterLink} to="/login" onClick={clearError}>here</Button>
                    </HStack>
                </Box>

            </VStack>
        </WhiteboxCenter>
    );
};

export default SignUp;
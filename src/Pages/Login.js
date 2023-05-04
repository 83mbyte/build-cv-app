import { VStack, Heading, Box, Button, HStack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate, } from 'react-router-dom';


import WhiteboxCenter from '../components/Wrappers/WhiteboxCenter';
import AlertScaleFade from '../components/Alert/AlertScaleFade';
import InputCustom from '../components/FormElements/InputCustom';
import { clearAuthError, logInThunk } from '../redux/features/utility/utilitySlice';

const Login_beta = () => {
    // Remove data (email,pass) from inputsValue
    // Remove data (email,pass) from inputsValue
    const [inputsValue, setInputsValue] = useState({ email: '', pass: '' });
    // const [inputsValue, setInputsValue] = useState({ email: process.env.REACT_APP_TEMP_EMAIL, pass: process.env.REACT_APP_TEMP_PASS });
    // Remove data (email,pass) from inputsValue
    // Remove data (email,pass) from inputsValue

    const sizeBreakPoints = ['sm', 'md'];
    const user = useSelector(state => state.utility.auth.data);
    const status = useSelector(state => state.utility.auth.status);
    const error = useSelector(state => state.utility.auth.error);
    const successMsg = useSelector(state => state.utility.auth.successMsg);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const clearError = () => {
        dispatch(clearAuthError());
    }

    const onChangeInput = (name, value) => {
        if (error !== '' || successMsg !== '') {
            dispatch(clearAuthError())
        };

        setInputsValue({
            ...inputsValue,
            [name]: value
        })
    }
    const handleClickLogin = () => {
        if (inputsValue.email !== '' && inputsValue.pass !== '') {
            dispatch(logInThunk({ email: inputsValue.email, pass: inputsValue.pass }))
        } else {
            console.log('data not provided')
        }
    }
    useEffect(() => {
        if (status === 'ready' && error === '' && user && user.userId) {
            navigate("/dashboard")
        }
    }, [status, error, navigate, user]);

    return (


        <WhiteboxCenter>
            <VStack spacing={[3, 5]} w='full' align={['flex-start', 'center']}>
                <VStack align={['flex-start', 'center']} w='full'>
                    <Heading as='h2'>Login</Heading>
                </VStack>
                <Box w='full'>
                    <InputCustom labelText='Email' required name={'email'} inputValue={inputsValue['email']} onChangeCallback={onChangeInput} />
                    <InputCustom labelText='Password' name={'pass'} type={'password'} inputValue={inputsValue['pass']} onChangeCallback={onChangeInput} errorMessage={'Must be at least 6 characters long.'} required />
                </Box>
                {
                    (error !== '' || successMsg !== '')
                    && <AlertScaleFade message={error !== '' ? error : successMsg} type={error !== '' ? 'error' : 'success'} />
                }
                <Box p={2} w='full'>
                    <Button
                        w='full'
                        colorScheme={'teal'}
                        size={sizeBreakPoints} rounded={sizeBreakPoints}
                        isLoading={status === 'loading'}
                        onClick={handleClickLogin}
                        isDisabled={error !== '' || inputsValue.pass.length < 6}
                    >Login</Button>
                </Box>
                <HStack w='full' justify={'center'} spacing={'1'} fontSize={'xs'} alignItems={'baseline'}>
                    <Text>Not registered? Click to </Text>
                    <Button variant={'link'} colorScheme={'teal'} as={RouterLink} to="/signup" fontSize={'xs'} mx={0} px={0} onClick={clearError} >SignUp</Button>
                </HStack>
            </VStack>
        </WhiteboxCenter>

    );
};

export default Login_beta;
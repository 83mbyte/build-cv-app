import { VStack, Heading, Box, Button, HStack, Text, Divider } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate, } from 'react-router-dom';

import { FcGoogle } from 'react-icons/fc';
import WhiteboxCenter from '../components/Wrappers/WhiteboxCenter';
import AlertScaleFade from '../components/Alert/AlertScaleFade';
import InputCustom from '../components/FormElements/InputCustom';
import { clearAuthError, signInGoogleThunk, logInThunk } from '../redux/features/utility/utilitySlice';
import AlternativeSignInBtn from '../components/AlternativeSignInBtn/AlternativeSignInBtn';

const Login = () => {
    const [inputsValue, setInputsValue] = useState({ email: '', pass: '' });
    // const [inputsValue, setInputsValue] = useState({ email: process.env.REACT_APP_TEMP_EMAIL, pass: process.env.REACT_APP_TEMP_PASS });

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
    const handleSignInBtnClick = () => {
        if (inputsValue.email !== '' && inputsValue.pass !== '') {
            dispatch(logInThunk({ email: inputsValue.email, pass: inputsValue.pass }))
        } else {
            console.log('data not provided')
        }
    }

    const googleSignIn = () => {
        dispatch(signInGoogleThunk(true))
    }

    useEffect(() => {
        if (status === 'ready' && error === '' && user && user.userId) {
            navigate("/dashboard")
        }
    }, [status, error, navigate, user]);

    useEffect(() => {

        if (sessionStorage.getItem(`firebase:pendingRedirect:${process.env.REACT_APP_API_KEY}:[DEFAULT]`)) {

            dispatch(signInGoogleThunk(false));
        }
    }, [dispatch]);


    return (

        <WhiteboxCenter>
            <VStack spacing={[3, 5]} w='full' align={['flex-start', 'center']}>
                <VStack align={['flex-start', 'center']} w='full'>
                    <Heading as='h2'>Sign In</Heading>
                </VStack>

                <LoginForm
                    error={error}
                    status={status}
                    successMsg={successMsg}
                    inputsValue={inputsValue}
                    sizeBreakPoints={sizeBreakPoints}
                    handleSignInBtnClick={handleSignInBtnClick}
                    onChangeInput={onChangeInput}
                />

                <HStack w='full' justify={'center'} spacing={'1'} fontSize={'xs'} alignItems={'baseline'}>
                    <Text>Not registered yet? Click to </Text>
                    <Button variant={'link'} colorScheme={'teal'} as={RouterLink} to="/signup" fontSize={'xs'} mx={0} px={0} onClick={clearError} >Sign Up</Button>
                </HStack>

                <AlternativeSignInForm>

                    <AlternativeSignInBtn
                        providerName={'Google'}
                        sizeBreakPoints={sizeBreakPoints}
                        icon={<FcGoogle />}
                        onClickFn={googleSignIn}
                    />
                </AlternativeSignInForm>

            </VStack>
        </WhiteboxCenter>

    );
};

export default Login;

const LoginForm = ({ error, status, successMsg, inputsValue, sizeBreakPoints, handleSignInBtnClick, onChangeInput }) => {
    return (
        <>
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
                    onClick={handleSignInBtnClick}
                    isDisabled={error !== '' || inputsValue.pass.length < 6}
                >Sign In</Button>
            </Box>
        </>
    )
}


const AlternativeSignInForm = ({ children }) => {
    return (
        <Box p={2} w='full'>
            <VStack spacing={[3, 5]} >
                <HStack w={'full'} justifyContent={'space-between'}>
                    <Divider w={'full'} />
                    <Text backgroundColor={''} textAlign={'center'} px={1} w={10} fontSize={'xs'}>else</Text>
                    <Divider w={'full'} />
                </HStack>
                <Box w='full' bg=''>
                    {children}
                </Box>
            </VStack >
        </Box >
    )
}
import { Box, Button, Checkbox, Slide, FormControl, FormLabel, Heading, HStack, Input, VStack, Alert, AlertIcon, } from '@chakra-ui/react';

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin, clearAuthError } from '../redux/features/utility/utilitySlice';
import { auth } from '../__firebase/firebaseConf';


const Login = () => {

    const [isVisible, setIsVisible] = useState(false);
    const [disabled, setDisabled] = useState(true);


    const emailRef = useRef(null);
    const passRef = useRef(null);
    const sizeBreakPoints = ['sm', 'md'];

    const dispatch = useDispatch();

    const status = useSelector(state => state.utility.auth.status);
    const error = useSelector(state => state.utility.auth.error);


    const onChangeHandler = () => {
        if (disabled) setDisabled(false);
        if (error != '') dispatch(clearAuthError());
    }

    const handleClickLogin = async () => {

        let email = emailRef.current.value;
        let password = passRef.current.value;

        if (email !== '' && password !== '') {
            dispatch(authLogin({ email, password, auth }));
        }
    }
    useEffect(() => {

        if (!isVisible) {
            setIsVisible(true)
        }
        return () => {
            console.log('unmounting')
            setIsVisible(false)
        }
    }, [])
    return (
        <Slide in={isVisible} direction='top' >
            <Box
                w={['full', 'md']}
                p={[8, 10]}
                mt={[20, '15vh']}
                mx={'auto'}
                border={['none', '1px']}
                borderColor={['', 'gray.300']}
                borderRadius={10}
            >
                <VStack spacing={[3, 5]} align='flex-start' w='full'>
                    <VStack spacing={1} w='full' align={['flex-start', 'center']}>
                        <Heading as='h2'>Login</Heading>
                    </VStack>

                    <FormControl  >
                        <FormLabel fontSize={sizeBreakPoints}>Email address:</FormLabel>
                        <Input
                            _focus={{ borderBottom: '1px solid teal' }}
                            _focusVisible={{ outline: 'none' }}
                            rounded={sizeBreakPoints}
                            size={sizeBreakPoints}
                            ref={emailRef}
                        />
                    </FormControl>

                    <FormControl colorScheme={'teal'} >
                        <FormLabel fontSize={sizeBreakPoints}>Password:</FormLabel>
                        <Input
                            _focus={{ borderBottom: '1px solid teal' }}
                            _focusVisible={{ outline: 'none' }}
                            type='password'
                            rounded={sizeBreakPoints}
                            size={sizeBreakPoints}
                            ref={passRef}
                            onChange={onChangeHandler}
                        />
                    </FormControl>
                    {/* <HStack w='full' justify={'space-between'} fontSize={['xs', 'md']} >
                    <Checkbox colorScheme={'teal'} size={sizeBreakPoints}>Remember me?</Checkbox>
                    <Button variant={'link'} colorScheme={'teal'} fontSize={sizeBreakPoints}>Forgot password</Button>
                </HStack> */}

                    {
                        error != '' && <Box w={'full'}  >
                            <Alert status='error' fontSize={'sm'} rounded={sizeBreakPoints}>
                                <AlertIcon />
                                There was an error processing your request
                            </Alert>
                        </Box>
                    }
                    <Button colorScheme={'teal'} w='full' size={sizeBreakPoints} rounded={sizeBreakPoints}
                        onClick={handleClickLogin}
                        isDisabled={disabled}
                        isLoading={status == 'loading'}
                    >
                        Login
                    </Button>
                </VStack>
            </Box>
        </Slide >

    );
};

export default Login;
import { authAPI } from '@/lib/authAPI';
import { setAuthFormFieldError, setAuthStatus, setAuthUserData } from '@/redux/auth/authSlice';
import { Box, Heading, VStack, Field, Input, Button, Icon, HStack } from '@chakra-ui/react';
import { motion } from 'motion/react';
import Link from 'next/link';

import { useEffect, useRef, useState } from 'react';
import { LuLogIn, LuEye, LuEyeOff } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { toaster } from '../ui/toaster';
import { authData } from '@/lib/content-lib';
import { useRouter } from 'next/navigation';
import { InputGroup } from '../ui/input-group';
import FooterContainer from '../footerCopyright/FooterContainer';

const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;


const LoginPageContainer = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(setAuthFormFieldError())
        }
    }, []);


    return (
        <VStack h='100vh' justifyContent={'space-between'}>
            <Box display={'flex'} px={2} flex={1} justifyContent={'center'} alignItems={'center'} w='full'>
                <LoginFormCard />
            </Box>
            <Box>
                <FooterContainer />
            </Box>
        </VStack>
    );
};

export default LoginPageContainer;

const LoginFormCard = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const errors = useSelector(state => state.auth.formErrors);
    const status = useSelector(state => state.auth.status);
    const dispatch = useDispatch();

    const validateEmail = (value) => {

        if (!value.match(emailPattern)) {
            dispatch(setAuthFormFieldError({ field: 'email', errorText: `Invalid email address` }));
        } else {
            if (errors.email) {
                dispatch(setAuthFormFieldError({ field: 'email', errorText: null }));
            }
        }
    }

    const validatePass = (value) => {
        if (value.length < 6) {
            dispatch(setAuthFormFieldError({ field: 'password', errorText: `Password is too short` }));

        } else {
            if (errors.password) {
                dispatch(setAuthFormFieldError({ field: 'password', errorText: null }));
            }
        }
    }

    const submitLogin = async () => {
        let email = emailRef.current.value;
        let password = passwordRef.current.value;


        dispatch(setAuthStatus('loading'));
        try {
            if (email && password && (!errors.email && !errors.password)) {

                let resp = await authAPI.login(email, password);

                if (resp && resp.status != 'Success') {
                    throw new Error(resp.message);
                } else {
                    if (resp.payload && resp.payload.userId) {
                        dispatch(setAuthUserData(resp.payload));
                        dispatch(setAuthStatus('ready'));
                        router.push('/editor');
                    }
                }

            } else {

                throw new Error('incorrect email or password ');
            }
        } catch (error) {
            dispatch(setAuthStatus('failed'));
            passwordRef.current.value = '';
            toaster.create({
                type: 'error',
                title: 'Error',
                description: error?.message ? error.message : 'error while login'
            })
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.3 } }}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
            <Box bg='white' borderRadius={'lg'} p={2} shadow={'sm'} width={['full', 'md']}>

                <VStack p={1} w='full' gap={4}>
                    <HStack><Heading as='h1' size={'2xl'}>Login</Heading></HStack>
                    <Box w='full'>
                        <Field.Root required invalid={errors.email}>
                            <Field.Label>Email</Field.Label>
                            <Input size={['sm', 'md']} placeholder="me@example.com"
                                _focusVisible={{ outline: '1px solid teal', border: '1px solid teal' }}
                                ref={emailRef}
                                onBlur={() => validateEmail(emailRef.current.value)} />
                            <Field.ErrorText>{authData?.login.form.email.errorText ?? 'Lorem ipsum'}</Field.ErrorText>
                        </Field.Root>
                    </Box>
                    <Box w='full'>
                        <Field.Root required invalid={errors.password}>
                            <Field.Label>Password</Field.Label>
                            <InputGroup endElement={<ShowPassword showPassword={showPassword} setShowPassword={setShowPassword} />} style={{ width: '100%' }}>
                                <Input size={['sm', 'md']}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="provide your password"
                                    _focusVisible={{ outline: '1px solid teal', border: '1px solid teal' }}
                                    ref={passwordRef}
                                    onBlur={() => validatePass(passwordRef.current.value)} />
                            </InputGroup>

                            <Field.ErrorText>{authData?.login.form.password.errorText ?? 'Lorem ipsum'}</Field.ErrorText>
                        </Field.Root>
                    </Box>
                    <Box w='full' mt={3}  >
                        <Button
                            w='full'
                            size={['sm', 'md']}
                            colorPalette={'teal'}
                            onClick={submitLogin} loading={status == 'loading'}
                        > <Icon size='sm'><LuLogIn /></Icon>Login </Button>

                    </Box>
                    <Box display={'flex'} justifyContent={'center'}>
                        <Link href='/' prefetch={true}>
                            <Button variant={'plain'}
                                size={['2xs', 'xs']}
                                _hover={{ opacity: 0.75 }}
                                color='teal'
                                aria-label='back button'
                            >return to index</Button>
                        </Link>
                    </Box>
                </VStack>
            </Box>
        </motion.div>
    )
}

const ShowPassword = ({ showPassword, setShowPassword }) => {

    return (
        <Box border={'0px solid red'} p={1} display={'flex'} alignItems={'center'} _hover={{ cursor: 'pointer', color: 'teal' }} onClick={() => setShowPassword(!showPassword)}>
            <Icon  >
                {
                    showPassword
                        ? <LuEye />
                        : <LuEyeOff />
                }
            </Icon>
        </Box>
    )
}
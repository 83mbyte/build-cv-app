import { Input, Heading, Field, Button, VStack, HStack, Separator, Text, Icon, Box } from '@chakra-ui/react';
import { InputGroup } from '@/components/ui/input-group';
import { toaster } from '@/components/ui/toaster';
import { useRef, useState } from 'react';
import { motion } from 'motion/react';

import { useDispatch, useSelector } from 'react-redux';
import { setAuthStatus, setAuthUserData } from '@/redux/auth/authSlice';

import { authData } from '@/lib/content-lib';
import { authAPI } from '@/lib/authAPI';

import { LuEye, LuEyeOff } from "react-icons/lu";

const AuthLoginForm = ({ errors, validateEmail, validatePass, closeWindow, changeFormHandler }) => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);

    const status = useSelector(state => state.auth.status);
    const dispatch = useDispatch();

    const buttonClickHandler = (type) => {
        if (type) {
            changeFormHandler(type);
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
                    if (resp.payload) {
                        dispatch(setAuthStatus('ready'));
                        dispatch(setAuthUserData(resp.payload));
                        closeWindow();
                    }
                }

            } else {

                throw new Error('incorrect email or password ');
            }
        } catch (error) {
            toaster.create({
                type: 'error',
                title: 'Error',
                description: error?.message ? error.message : 'error while login'
            })
            dispatch(setAuthStatus('failed'));
        }
    }

    return (
        <motion.div
            style={{ width: '100%' }}
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.5 } }}
        >

            <VStack w='full'>
                <Heading>{authData?.login.heading ?? 'Lorem ipsum'}</Heading>
                <Field.Root required invalid={errors.email}>
                    <Field.Label>
                        {authData?.login.form.email.label ?? 'Lorem ipsum'}
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                        placeholder={authData?.login.form.email.placeholder ?? 'Lorem ipsum'}
                        _focusVisible={{ outline: '1px solid teal', border: '1px solid teal' }}
                        size={['sm', 'md']}
                        type={'email'} ref={emailRef}
                        onBlur={() => validateEmail(emailRef.current.value)} />
                    <Field.ErrorText>{authData?.login.form.email.errorText ?? 'Lorem ipsum'}</Field.ErrorText>
                </Field.Root>

                <Field.Root required invalid={errors.password}>
                    <Field.Label>
                        {authData?.login.form.password.label ?? 'Lorem ipsum'}
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup endElement={<ShowPassword showPassword={showPassword} setShowPassword={setShowPassword} />} style={{ width: '100%' }}>
                        <Input
                            placeholder={authData?.login.form.password.placeholder ?? 'Lorem ipsum'}
                            type={showPassword ? 'text' : 'password'}
                            ref={passwordRef}
                            _focusVisible={{ outline: '1px solid teal', border: '1px solid teal' }}
                            size={['sm', 'md']}
                            onBlur={() => validatePass(passwordRef.current.value)} />
                    </InputGroup>
                    <Field.ErrorText>{authData?.login.form.password.errorText ?? 'Lorem ipsum'}</Field.ErrorText>
                </Field.Root>
                <Button w='75%' size={['sm', 'md']} colorPalette={'teal'} onClick={submitLogin} loading={status == 'loading'}>
                    {authData?.login.mainButton ?? 'Lorem ipsum'}
                </Button>
                <Separator w='75%' />
                <HStack>
                    <Text fontSize={['xs', 'sm']}>{authData.login.notRegistered ?? 'Not registered?'}</Text>
                    <Button variant={'plain'} _hover={{ opacity: 0.75 }} size={['xs', 'sm']} color='teal' onClick={() => buttonClickHandler('signup')}

                    >{authData.login.registerButton ?? 'Create account'}</Button>
                </HStack>
            </VStack>
        </motion.div>
    )
}

export default AuthLoginForm;

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
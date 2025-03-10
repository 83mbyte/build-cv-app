import { Input, Heading, Field, Button, VStack, HStack, Separator, Text } from '@chakra-ui/react';
import { useRef } from 'react';
import { motion } from 'motion/react';

import { authData } from '@/lib/content-lib';
import { useSelector } from 'react-redux';

const AuthLoginForm = ({ errors, validateEmail, validatePass, loginCallback, changeFormHandler }) => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const status = useSelector(state => state.auth.status);

    const buttonClickHandler = (type) => {
        if (type) {
            changeFormHandler(type);
        }
    }

    const submitLogin = async () => {
        let email = emailRef.current.value;
        let password = passwordRef.current.value;

        loginCallback(email, password);
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
                        type={'email'} ref={emailRef}
                        onBlur={() => validateEmail(emailRef.current.value)} />
                    <Field.ErrorText>{authData?.login.form.email.errorText ?? 'Lorem ipsum'}</Field.ErrorText>
                </Field.Root>

                <Field.Root required invalid={errors.password}>
                    <Field.Label>
                        {authData?.login.form.password.label ?? 'Lorem ipsum'}
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                        placeholder={authData?.login.form.password.placeholder ?? 'Lorem ipsum'}
                        type='password' ref={passwordRef}
                        onBlur={() => validatePass(passwordRef.current.value)} />
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
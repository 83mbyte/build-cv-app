import { useRef } from 'react';

import { Input, Heading, Button, Field, VStack } from '@chakra-ui/react';

import { authData } from '@/lib/content-lib';
import { motion } from 'motion/react';
import { useDispatch } from 'react-redux';
import { setAuthFormData } from '@/redux/auth/authSlice';
import { sanitizeInput } from '@/lib/commonScripts';
import { toaster } from '@/components/ui/toaster';


const AuthSignupForm = ({ errors, validateEmail, validatePass, validateAddress, changeFormHandler }) => {

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const addressRef = useRef(null);
    const dispatch = useDispatch();

    const buttonClickHandler = (type) => {
        if (type) {
            changeFormHandler(type);
        }
    }

    const submitForm = async () => {

        let firstName = firstNameRef.current.value;
        let lastName = lastNameRef.current.value;
        let email = emailRef.current.value;
        let password = passwordRef.current.value;
        let address = addressRef.current.value;



        if (firstName && firstName.length > 1) {
            firstName = sanitizeInput(firstName)
        }
        if (lastName && lastName.length > 1) {
            lastName = sanitizeInput(lastName);
        }

        if (address && address.length > 1) {
            address = sanitizeInput(address);
        }

        try {

            if (email && password && address && (!errors.email && !errors.password)) {

                /// in the very end
                firstNameRef.current.value = '';
                lastNameRef.current.value = '';
                emailRef.current.value = '';
                passwordRef.current.value = '';

                dispatch(setAuthFormData({ email, password, address, firstName, lastName }));

                buttonClickHandler('merchant');

            } else {
                throw new Error(authData.signup.errors.noData ?? 'Lorem ipsum');
            }

        } catch (error) {
            console.log(error.message);
            toaster.create({
                title: 'Error',
                type: 'error',
                description: error?.message && error.message,
                duration: 3000
            })
        }
    }

    return (
        <motion.div
            style={{ width: '100%' }}
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.5 } }}
        >

            <VStack w='full' gap={3}>
                <Heading>{authData?.signup?.heading ?? 'Lorem ipsum'}</Heading>

                <Field.Root  >
                    <Field.Label>
                        {authData?.signup.form?.firstName?.label ?? 'Lorem ipsum'}
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <Input placeholder={authData?.signup.form?.firstName?.placeholder ?? 'Lorem ipsum'} type='text' ref={firstNameRef} />
                </Field.Root>
                <Field.Root  >
                    <Field.Label>
                        {authData?.signup.form?.lastName?.label ?? 'Lorem ipsum'}
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <Input placeholder={authData?.signup.form?.lastName?.placeholder ?? 'Lorem ipsum'} type='text' ref={lastNameRef} />
                </Field.Root>
                <Field.Root required invalid={errors.email}>
                    <Field.Label>
                        {authData?.signup.form.email.label ?? 'Lorem ipsum'}
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <Input placeholder={authData?.signup.form.email.placeholder ?? 'Lorem ipsum'} type={'email'} ref={emailRef} onBlur={() => validateEmail(emailRef.current.value)} />
                    <Field.ErrorText>{authData?.signup.form.email.errorText ?? 'Lorem ipsum'}</Field.ErrorText>
                </Field.Root>
                <Field.Root required invalid={errors.password}>
                    <Field.Label>
                        {authData?.signup.form.password.label ?? 'Lorem ipsum'}
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <Input placeholder={authData?.signup.form.password.placeholder ?? 'Lorem ipsum'} type='password' ref={passwordRef} onBlur={() => validatePass(passwordRef.current.value)} />
                    <Field.ErrorText>{authData?.signup.form.password.errorText ?? 'Lorem ipsum'}</Field.ErrorText>
                </Field.Root>
                {/* <Field.Root required invalid={errors.address}>
                    <Field.Label>
                        {authData?.signup.form?.address?.label ?? 'Lorem ipsum'}
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <Input placeholder={authData?.signup.form?.address?.placeholder ?? 'Lorem ipsum'} type='text' ref={addressRef}
                        onBlur={() => validateAddress(addressRef.current.value)}
                    />
                    <Field.ErrorText>{authData?.signup.form.address.errorText ?? 'Lorem ipsum'}</Field.ErrorText>
                </Field.Root> */}

                <Button w='75%' size={['sm', 'md']} colorPalette={'teal'} onClick={submitForm}>{authData?.signup.continueButton ?? 'Lorem ipsum'}</Button>

            </VStack>
        </motion.div>



    )
}

export default AuthSignupForm;
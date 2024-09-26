import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthFormError, signUpThunk } from '@/redux/features/auth/authSlice';

import FormAuthContainer from '../FormItems/FormAuthContainer';
import InputCustom from '../FormItems/InputCustom';
import AlertCustom from '../Alert/AlertCustom';
import sanitizeString from '@/lib/sanitizeString';


const sizeBreakPoints = ['sm', 'md'];
const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;

const AuthSignupForm = ({ changeForm }) => {
    const dispatch = useDispatch();
    const status = useSelector(state => state.auth.auth.status);
    const error = useSelector(state => state.auth.auth.error);
    const successMsg = useSelector(state => state.auth.auth.successMsg);

    const formRef = useRef(null);

    const submitForm = async (e) => {
        e.preventDefault();

        let formData = new FormData(formRef.current);
        let email = formData.get('email');
        let password = formData.get('password');
        let firstName = formData.get('firstName');
        let lastName = formData.get('lastName');

        // sanitizing user input 
        if (firstName && firstName.length > 1) {
            firstName = sanitizeString(firstName)
        }
        if (lastName && lastName.length > 1) {
            lastName = sanitizeString(lastName);
        }

        try {
            if (email && password) {
                if (!email.match(emailPattern)) {
                    dispatch(setAuthFormError({ message: `Invalid email address` }));
                }
                else if (password.length < 6) {
                    dispatch(setAuthFormError({ message: `Password is too short` }));
                    formRef.current.password.value = '';
                }
                else {
                    await dispatch(signUpThunk({ email, password, firstName, lastName }));
                    formRef.current.email.value = '';
                    formRef.current.password.value = '';
                    formRef.current.lastName.value = '';
                    formRef.current.firstName.value = '';
                }

            } else {
                throw new Error('email/password is not provided');
            }

        } catch (error) {
            console.log('Error: ', error.message)
            dispatch(setAuthFormError({ message: error.message }));
        }
    }

    return (

        <FormAuthContainer title={'Sign Up'}>

            <form ref={formRef} onSubmit={submitForm}>
                <VStack w='full' bg='' mb={2} spacing={4} >

                    <InputCustom name='firstName' labelText='First Name' />
                    <InputCustom name='lastName' labelText='Last Name' />
                    <InputCustom name='email' labelText='Email' type='email' required />
                    <InputCustom name='password' labelText='Password' type='password' required errorMessage='Must be at least 6 characters long.' />
                    {/* Error/Success message alert will be there */}
                    <Box
                        key={'signupFormAlert'}
                        as={motion.div}
                        layoutId='alertWrappSignup'
                        layout
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '',
                            height: (error !== '' || successMsg !== '') ? 'auto' : 0,
                            maxHeight: '70px',
                            width: '100%',
                            padding: 0,
                            margin: 0,
                        }}
                    >

                        <AnimatePresence mode='wait'>
                            {
                                (error !== '' || successMsg !== '') &&
                                <AlertCustom message={error !== '' ? error : successMsg} type={error !== '' ? 'error' : 'success'} />
                            }
                        </AnimatePresence>
                    </Box>

                    {/* Error/Success message alert will be there */}
                    <Box mb={2} w='full'>
                        <Button
                            w='full'
                            colorScheme={'teal'}
                            size={sizeBreakPoints} rounded={sizeBreakPoints}
                            isLoading={status === 'loading'}
                            onClick={(e) => { submitForm(e) }}
                        >Sign Up
                        </Button>
                    </Box>

                    <HStack w='full' justify={'center'} spacing={'0'} fontSize={'xs'} alignItems={'baseline'}>
                        <Text>Already registered? Please login</Text>
                        <Button variant={'link'} colorScheme={'teal'} fontSize={'xs'} mx={0} ml={'-0.5'} px={0} onClick={() => changeForm('login')}>here</Button>
                    </HStack>
                </VStack>
            </form>
        </FormAuthContainer>
    );
};

export default AuthSignupForm;
import { Box, Button, VStack, HStack, Text } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

import { useSelector, useDispatch } from 'react-redux';
import { setAuthFormError, signInGoogleThunk, signInThunk } from '@/redux/features/auth/authSlice';

import InputCustom from '../FormItems/InputCustom';
import AlternativeSignInForm from '../FormItems/AlternativeSignInForm';
import AlternativeSignInBtn from '../Buttons/AlternativeSignInBtn';
import AlertCustom from '../Alert/AlertCustom';
import FormAuthContainer from '../FormItems/FormAuthContainer';

import { FcGoogle } from 'react-icons/fc';

const sizeBreakPoints = ['sm', 'md'];
const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;

const AuthLoginForm = ({ changeForm }) => {
    const formRef = useRef(null);
    const router = useRouter();

    const dispatch = useDispatch();
    const data = useSelector(state => state.auth.auth.data);
    const status = useSelector(state => state.auth.auth.status);
    const error = useSelector(state => state.auth.auth.error);
    const successMsg = useSelector(state => state.auth.auth.successMsg);

    const formSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData(formRef.current);
        let email = formData.get('email');
        let password = formData.get('password');

        try {

            if (email && password) {
                if (!email.match(emailPattern)) {
                    dispatch(setAuthFormError({ message: `Invalid email address` }));
                }

                else {
                    dispatch(signInThunk({ email, password }))
                    formRef.current.email.value = '';
                    formRef.current.password.value = '';
                }

            } else {
                throw new Error('email/password is not provided');

            }
        } catch (error) {
            dispatch(setAuthFormError({ message: error.message }));
        }
    }

    const googleSignIn = () => {
        dispatch(signInGoogleThunk(true));
    }

    useEffect(() => {
        if (data) {

            if (data?.accessToken && data?.userId) {
                router.push('/dashboard')
            }
        }
    }, [data])

    useEffect(() => {
        // google signup after redirect

        // TODO
        // TODO  deploy and test it
        // TODO
        if (sessionStorage.getItem(`firebase:pendingRedirect:${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}:[DEFAULT]`)) {
            dispatch(signInGoogleThunk(false))
        }
    }, [])

    return (


        <FormAuthContainer title={'Sign In'}>
            <form ref={formRef} onSubmit={formSubmit}>
                <VStack w='full' bg='' mb={2} spacing={4} >

                    <InputCustom name='email' labelText='Email' required />
                    <InputCustom name='password' labelText='Password' type='password' required errorMessage='Must be at least 6 characters long.' />

                    {/* Error/Success message alert will be there */}
                    <Box
                        key={'loginFormAlert'}
                        as={motion.div}
                        layoutId='alertWrappLogin'
                        layout
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '',
                            height: (error !== '' || successMsg !== '') ? '50px' : 0,
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
                            onClick={(e) => formSubmit(e)}
                        >Login
                        </Button>
                    </Box>


                    <HStack w='full' justify={'center'} spacing={'1'} fontSize={'xs'} alignItems={'baseline'}>
                        <Text>Not registered yet? Click to </Text>
                        <Button variant={'link'} colorScheme={'teal'} fontSize={'xs'} mx={0} px={0} onClick={() => changeForm('signup')} >Sign Up</Button>
                    </HStack>
                    <AlternativeSignInForm >
                        <AlternativeSignInBtn
                            providerName={'Google'}
                            sizeBreakPoints={sizeBreakPoints}
                            icon={<FcGoogle />}
                            isLoading={status === 'loading'}
                            onClickCallback={googleSignIn}
                        />
                    </AlternativeSignInForm>
                </VStack></form>
        </FormAuthContainer>
    );
};

export default AuthLoginForm;



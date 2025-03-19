
import { setShowAuthModal, setAuthFormFieldError, setAuthFormData, setSubscriptionSignTempData, } from '@/redux/auth/authSlice';
import { Portal, Box, AbsoluteCenter, Container, IconButton, VStack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, lazy, Suspense } from 'react';

import { LuX, } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';


import FallbackSpinner from '@/components/editor_page/FallbackSpinner';

const AuthFeatures = lazy(() => import('./AuthFeatures'));
const AuthLoginForm = lazy(() => import('./AuthLoginForm'));
const AuthPayMerchant = lazy(() => import('./AuthPayMerchant'));
const AuthSignupForm = lazy(() => import('./AuthSignupForm'));



const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;


// Auth modal window 
const AuthModal = ({ size = 'lg', themeColor = 'teal' }) => {
    const showModal = useSelector(state => state.auth.authModal.show);
    const modalType = useSelector(state => state.auth.authModal.type);

    const errors = useSelector(state => state.auth.formErrors);
    const dispatch = useDispatch();

    const closeWindow = () => {
        dispatch(setAuthFormData({ password: null, email: null }));
        dispatch(setShowAuthModal({ show: false }));

        dispatch(setSubscriptionSignTempData({
            key: 'clientSecret',
            value: null
        }))
    };

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
            // passwordRef.current.value = '';
        } else {
            if (errors.password) {
                dispatch(setAuthFormFieldError({ field: 'password', errorText: null }));
            }
        }
    }
    const validateAddress = (value) => {
        if (value.length < 3) {
            dispatch(setAuthFormFieldError({ field: 'address', errorText: `No address provided` }));
        } else {
            if (errors.address) {
                dispatch(setAuthFormFieldError({ field: 'address', errorText: null }));
            }
        }
    }

    const changeFormHandler = async (type) => {
        if (type) {
            if (type == 'signup') {
                dispatch(setSubscriptionSignTempData({
                    key: 'clientSecret',
                    value: null
                }))
            }
            dispatch(setShowAuthModal({ show: true, type }));
        }
    }

    useEffect(() => {
        if (showModal) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = '';
        }
    }, [showModal])


    return (

        <AnimatePresence mode='wait'>
            {
                showModal &&
                <Portal>
                    <Box position={'fixed'} bgColor={'rgba(0,0,0,0.3)'} w='100%' h='100vh' zIndex={'10'} overflowY={'hidden'} top={0} left={0}>
                        <AbsoluteCenter w='full' px={1}>
                            <Container width={['full', modalType == 'merchant' ? 'xl' : size]} padding={0} mx={1} >
                                <motion.div
                                    key={'authModal'}
                                    initial={{ opacity: 0, scale: 0.75 }}
                                    animate={{ opacity: 1, scale: 1, transition: { delay: 0.2 } }}
                                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                                    style={{ width: '100%', padding: 0, margin: 0 }}
                                    layout
                                >
                                    <Box bg='white' width='full' margin={0} padding={[3, 4]} rounded={'lg'} boxShadow={'md'}  >

                                        <Box bg='' display={'flex'} w='full' alignItems={'center'} justifyContent={'flex-end'} p={0} m={0}>
                                            <IconButton
                                                aria-label="Hide"
                                                variant={'plain'}
                                                bgColor={`white`}
                                                border={'0px solid black'}
                                                _hover={{ backgroundColor: themeColor ? `${themeColor}.50` : '' }}
                                                size={'2xs'}
                                                rounded={'md'}
                                                p={0}
                                                onClick={closeWindow}
                                            >
                                                <LuX />
                                            </IconButton>
                                        </Box>


                                        <VStack gap={3} maxH={'50%'} overflow={'hidden'}>


                                            {
                                                modalType == 'features'
                                                &&
                                                <Suspense fallback={<FallbackSpinner />}>

                                                    <AuthFeatures changeFormHandler={changeFormHandler} />
                                                </Suspense>
                                            }
                                            {
                                                modalType == 'signup'
                                                &&
                                                <Suspense fallback={<FallbackSpinner />}>
                                                    <AuthSignupForm
                                                        errors={errors}
                                                        validateEmail={validateEmail}
                                                        validatePass={validatePass}
                                                        validateAddress={validateAddress}
                                                        changeFormHandler={changeFormHandler} />
                                                </Suspense>
                                            }

                                            {
                                                modalType == 'merchant' &&
                                                <Suspense fallback={<FallbackSpinner />}>
                                                    <AuthPayMerchant changeFormHandler={changeFormHandler} closeWindow={closeWindow} />
                                                </Suspense>
                                            }

                                            {
                                                modalType == 'login' &&
                                                <Suspense fallback={<FallbackSpinner />}>
                                                    <AuthLoginForm errors={errors} validateEmail={validateEmail} validatePass={validatePass} changeFormHandler={changeFormHandler} closeWindow={closeWindow} />
                                                </Suspense>
                                            }

                                        </VStack>

                                    </Box>
                                </motion.div>
                            </Container>
                        </AbsoluteCenter>
                    </Box>
                </Portal>
            }
        </AnimatePresence >
    );
};

export default AuthModal;
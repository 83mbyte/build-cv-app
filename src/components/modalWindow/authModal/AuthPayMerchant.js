import React, { useEffect, useState } from 'react';
import { Heading, VStack, Box, Button, Alert, Highlight, Text } from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';

import { motion } from 'motion/react';

import { loadStripe } from '@stripe/stripe-js';
import { Elements, useElements, useStripe, PaymentElement } from '@stripe/react-stripe-js';

import { useDispatch, useSelector } from 'react-redux';
import { setAuthStatus, setSubscriptionSignTempData } from '@/redux/auth/authSlice';

import { authData } from '@/lib/content-lib';
import { authAPI } from '@/lib/authAPI';
import { getDataFromFunctionsEndpoint } from '@/lib/commonScripts';
import FallbackSpinner from '@/components/editor_page/FallbackSpinner';

import { LuShoppingBag } from "react-icons/lu";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const AuthPayMerchant = ({ changeFormHandler, closeWindow }) => {

    const showModal = useSelector(state => state.auth.authModal);
    const clientSecret = useSelector(state => state.auth.subscriptionSignTempData.clientSecret);
    const dispatch = useDispatch();

    useEffect(() => {
        const createSetupIntent = async () => {
            try {
                const options = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                };
                const res = await getDataFromFunctionsEndpoint('createSetupIntent', options);

                if (res) {

                    const data = await res.json();
                    if (data.clientSecret) {
                        console.log('clientSecret received!!!')
                        dispatch(
                            setSubscriptionSignTempData({
                                key: 'clientSecret',
                                value: data.clientSecret ?? null,
                            })
                        );
                    } else {
                        throw new Error('no client secret received')
                    }

                } else {
                    throw new Error('no server response');
                }

            } catch (error) {
                console.error(error.message ?? 'error while create_setup_intent')
            }
        }

        if (showModal.show == true && showModal.type === 'merchant' && !clientSecret) {

            createSetupIntent();
        }

    }, [showModal.type, showModal.show, clientSecret, dispatch]);

    useEffect(() => {
        console.log('AuthPayMerchant mounted');
        return () => console.log('AuthPayMerchant unmounted');
    }, []);
    return (
        <motion.div
            style={{ width: '100%' }}
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.5 } }}
        >

            <VStack w='full' gap={3} maxH={'80vh'} p={1}>
                <Box>
                    <Heading as='h3' size='lg'><Highlight query={'$10/month'} styles={{ px: "0.5", color: "teal" }}>{authData.merchant.heading ?? 'Lorem ipsum'}</Highlight></Heading>
                    <Text fontSize={'xs'} textAlign={'right'}>{authData.merchant.textCancel ?? 'Lorem ipsum'}</Text>
                </Box>

                <motion.div layout style={{ width: '100%' }}>
                    {
                        clientSecret ? (
                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <PaymentForm clientSecret={clientSecret} changeFormHandler={changeFormHandler} closeWindow={closeWindow} />
                            </Elements>
                        ) : (
                            <div>Loading...</div>
                        )}
                </motion.div>
            </VStack>
        </motion.div>
    );
};

export default AuthPayMerchant;

const PaymentForm = ({ clientSecret, changeFormHandler, closeWindow }) => {

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [isFormLoading, setIsFormLoading] = useState(true);

    const status = useSelector(state => state.auth.status);
    const { address, email, password, firstName, lastName } = useSelector(state => state.auth.formData);

    const dispatch = useDispatch();


    const handleSubmit = async (event) => {
        event.preventDefault();


        if (!stripe || !elements) {
            return;
        }

        dispatch(setAuthStatus('loading'));
        // sent formdata from PaymentElement before confirmSetup
        const { error: submitError } = await elements.submit();
        if (submitError) {
            setError(submitError.message);
            dispatch(setAuthStatus(''));
            return;
        }

        // confim payment method setup
        const { error, setupIntent } = await stripe.confirmSetup({
            elements,
            clientSecret,
            // confirmParams: {
            //     return_url: 'http://sOm3_p4th_t0_r3turn:3000/success', 
            // },
            redirect: 'if_required', // redirect if required (in case of 3DS, for example)
        });

        if (error) {
            setError(error.message);
            dispatch(setAuthStatus(''));

        } else {
            // SetupIntent confirmed,  push data to server to create a subscription
            try {

                const options = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        paymentMethodId: setupIntent.payment_method,
                        email, password, firstName, lastName
                    }),
                };
                const res = await getDataFromFunctionsEndpoint('createSubscriptionIntent', options);

                if (res) {
                    const result = await response.json();

                    if (result.success == true && result.subscription.status == 'active') {
                        toaster.create({
                            type: 'success',
                            title: 'Success',
                            description: authData?.merchant.toasts.success ?? 'Lorem ipsum',
                            duration: 4000,
                        });
                        let loginResult = await authAPI.login(email, password);

                        if (loginResult && loginResult.status != 'Success') {
                            throw new Error(resp.message);
                        } else {

                            if (loginResult.payload) {
                                closeWindow();
                            } else {
                                throw new Error(authData.merchant.errors.unableToLogin ?? 'Lorem ipsum')
                            }
                        }

                    } else {
                        throw new Error(result.error)
                    }
                } else {
                    throw new Error('No server response');
                }
            } catch (err) {
                setError(err.message ?? authData?.merchant.errors.default);
                toaster.create({
                    type: 'error',
                    title: 'Error',
                    description: err.message,
                    duration: 4000
                })
            }
            dispatch(setAuthStatus(''));
        }


    }

    useEffect(() => {
        if (stripe && elements) {
            setIsFormLoading(false); //  
        }
    }, [stripe, elements,]);
    return (
        <form onSubmit={handleSubmit} style={{ width: '100%', minHeight: '30px' }}>
            <VStack gap={3} >

                {
                    isFormLoading
                        ? <FallbackSpinner />
                        :
                        <>
                            <Box borderRadius={'lg'} padding={1} w='full'>
                                <PaymentElement
                                    options={{
                                        layout: 'tabs', // can be as (tabs, accordion, auto)
                                    }}
                                />
                            </Box>

                            {
                                error &&
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1, transition: { duration: 1 } }}>
                                    <Alert.Root status="error" marginY={2} py={1} alignItems={'center'} >
                                        <Alert.Indicator textStyle="sm" />
                                        <Alert.Title textStyle="sm">{error}</Alert.Title>
                                    </Alert.Root>
                                </motion.div>
                            }
                            <VStack display={'flex'} justifyContent={'center'} w='50%'>
                                <Button w='full' type='submit' colorPalette={'teal'} size={['xs', 'sm']} disabled={!stripe || status == 'loading'} loading={status == 'loading'} loadingText={authData.merchant.buttons.processing ?? `Lorem psum`}>
                                    <LuShoppingBag />
                                    {authData.merchant.buttons.pay ?? `Lorem psum`}
                                </Button>
                                <Button variant={'plain'} colorPalette={'teal'} size={['xs', 'sm']} onClick={() => changeFormHandler('signup')}>
                                    back
                                </Button>
                            </VStack>
                        </>
                }
            </VStack>
        </form>
    )
}
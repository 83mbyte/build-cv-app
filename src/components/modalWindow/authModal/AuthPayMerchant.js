import { Heading, VStack, Box, Button, Alert } from '@chakra-ui/react';
import { authData } from '@/lib/content-lib';
import { motion } from 'motion/react';

import { loadStripe } from '@stripe/stripe-js';
import { Elements, useElements, useStripe, CardElement, } from '@stripe/react-stripe-js';




import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toaster } from '@/components/ui/toaster';
import { setAuthFormData, setShowAuthModal } from '@/redux/auth/authSlice';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const AuthPayMerchant = () => {


    return (
        <motion.div
            style={{ width: '100%' }}
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.5 } }}
        >

            <VStack w='full' gap={3} maxH={'80vh'} p={1}>
                <Heading>{authData.merchant.heading ?? 'Lorem ipsum'}</Heading>
                <Elements stripe={stripePromise} options={{ appearance: { labels: 'floating', theme: 'night' } }}  >
                    <PaymentForm />
                </Elements>
            </VStack>
        </motion.div>
    );
};
const PaymentForm = () => {
    const elements = useElements();
    const stripe = useStripe();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const { address, email, password, firstName, lastName } = useSelector(state => state.auth.formData);
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) {
            retutn;
        }

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setError(error.message);
            setProcessing(false);
        } else {

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/createSubscription`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        paymentMethodId: paymentMethod.id,
                        email, password, firstName, lastName,
                    })
                });

                const result = await response.json();
                console.log('result: ', result)
                if (result.success == true && result.subscription.status == 'active') {
                    toaster.create({
                        type: 'success',
                        title: 'Success',
                        description: authData?.merchant.toasts.success ?? 'Lorem ipsum',
                        duration: 4000,
                    })
                    dispatch(setShowAuthModal({ show: false }));
                    dispatch(setAuthFormData({ email: null, address: null, firstName: null, lastName: null, password: null }));

                }
                // TODO 3D sec 
                // else if (result.success == true && result.subcription.status == 'incomplete') { 'create 3D secure' }
                else {

                    throw new Error(result.error)
                }
            } catch (err) {
                console.log('Error ', err.message)
                setError(err.message ?? authData?.merchant.errors.default);
                toaster.create({
                    type: 'error',
                    title: 'Error',
                    description: err.message,
                    duration: 4000
                })

            }
            setProcessing(false);

        } //end if (error ) else
    }

    return (
        <form onSubmit={handleSubmit} style={{ width: '100%', minHeight: '30px' }}>
            <VStack gap={3} >
                <Box borderRadius={'lg'} padding={1} w='full'>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    lineHeight: '20px',

                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
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
                <Box display={'flex'} justifyContent={'center'}>
                    <Button type='submit' colorPalette={'teal'} size={['xs', 'sm']} disabled={!stripe || processing}>
                        {
                            processing
                                ? authData.merchant.buttons.processing ?? `Lorem psum`
                                : authData.merchant.buttons.pay ?? `Lorem psum`
                        }
                    </Button>
                </Box>
            </VStack>
        </form >
    );
};

export default AuthPayMerchant;
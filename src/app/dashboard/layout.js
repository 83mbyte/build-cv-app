'use client'
import React, { useState, useEffect } from 'react';
import { Box, Button, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';
import { setLoggedUser } from '@/redux/features/auth/authSlice';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/__firebase/__firebaseConf';

import FooterContainer from '@/components/Footer/FooterContainer';

import '../global.css';

const metadata = {
    title: `${process.env.NEXT_PUBLIC_APP_NAME} - Dashboard. User Area.`,
    description: `${process.env.NEXT_PUBLIC_APP_NAME} - AI-powered Resume Builder.`,
}

const auth = getAuth(app);

const Dashboard_Layout = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);

    const userLogged = useSelector(state => state.auth.auth.data);
    const dispatch = useDispatch();

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {

            if (user && user.uid && user.accessToken && user.emailVerified) {

                dispatch(setLoggedUser({ userId: user.uid, accessToken: user.accessToken, email: user.email }));

            } else if ((process.env.NEXT_PUBLIC_NODE_MODE === 'development') && (user && user.uid && user.accessToken)) {

                dispatch(setLoggedUser({ userId: user.uid, accessToken: user.accessToken, email: user.email }));

            } else {
                dispatch(setLoggedUser(null));
            }

            setIsLoading(false);
        })

        return () => unsubscribe();
    }, [])


    return (

        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            justifyContent: 'space-between',

        }}
        >
            <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flex: 1, }}>
                {
                    isLoading
                        ? <Spinner color='teal' size='xl' />
                        :
                        <>
                            {
                                (userLogged?.userId && userLogged?.accessToken)
                                    ? children
                                    : <AccessDenied />
                            }
                        </>
                }
            </div>

            <div style={{ width: '100%' }}>
                <FooterContainer />
            </div>

        </div>
    );
};

export default Dashboard_Layout;

const AccessDenied = () => {
    return (
        <VStack spacing={10}>
            <Heading color={'red'}>Access Denied</Heading>
            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'}>
                <Text mr={1}>Please </Text>
                <Button colorScheme={'teal'} variant={'link'} as={Link} href={'/auth'} > login</Button>
            </Box>
        </VStack>
    )
}
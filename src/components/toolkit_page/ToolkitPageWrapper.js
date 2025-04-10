'use client'

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSubscriptionDetailsThunk, setAuthUserData } from '@/redux/auth/authSlice';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { app } from '@/__firebase/__firebaseConf';
import { ProviderRedux, ProviderUI } from '@/app/providers';

import { Container, VStack } from '@chakra-ui/react';
import { Toaster } from "@/components/ui/toaster";

import FooterContainer from '../footerCopyright/FooterContainer';
import ToolkitHeader from './ToolkitHeader';
import FallbackSpinner from '../editor_page/FallbackSpinner';

const auth = getAuth(app);

const ToolkitPageWrapper = ({ children }) => {

    return (
        <ProviderUI>

            <ProviderRedux>

                <VStack bg='' minH={'100vh'} justifyContent={'space-between'} p={['2', '6']}>
                    <ToolkitHeader />

                    <Container bg='' maxWidth={'4xl'} px={0}>
                        <AuthWrapper>
                            {children}
                        </AuthWrapper>
                    </Container>

                    <FooterContainer />
                </VStack>

                <Toaster />
            </ProviderRedux>
        </ProviderUI >
    );
};

export default ToolkitPageWrapper;

const AuthWrapper = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch();
    useEffect(() => {
        // manage userLogged state

        const unsubscribe = onAuthStateChanged(auth, (user) => {

            if (user && user.uid && user.accessToken) {
                // logged user
                auth.currentUser.getIdTokenResult(user.accessToken).then((idTokenResult) => {

                    dispatch(setAuthUserData({ userId: user.uid, accessToken: user.accessToken, email: user.email, role: idTokenResult?.claims.admin ? 'admin' : 'user', fullName: user.displayName, subscription: {} }));
                    dispatch(getSubscriptionDetailsThunk({ userId: user.uid, accessToken: user.accessToken, }))
                })
            } else {
                // guest user
                dispatch(setAuthUserData(null));
            }
            setIsLoading(false);
        })

        return () => unsubscribe();
    }, []);

    return (
        <>
            {
                isLoading
                    ? <FallbackSpinner />
                    : children
            }
        </>
    )
}
'use client'
import store from '@/redux/store';
import { ChakraProvider, defaultSystem, } from '@chakra-ui/react';
import { Provider } from 'react-redux';

export function ProviderUI({ children }) {
    return (
        <ChakraProvider value={defaultSystem}>
            {children}
        </ChakraProvider>
    )
}

export function ProviderRedux({ children }) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
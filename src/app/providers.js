import { ChakraProvider, defaultSystem, } from '@chakra-ui/react';

export function ProviderUI({ children }) {
    return (
        <ChakraProvider value={defaultSystem}>
            {children}
        </ChakraProvider>
    )
}
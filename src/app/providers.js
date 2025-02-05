'use client'
import store from '@/redux/store';
import { ChakraProvider, defaultConfig, defineConfig, createSystem } from '@chakra-ui/react';
import { Provider } from 'react-redux';


const customConfig = defineConfig({
    theme: {
        tokens: {
            fonts: {
                // heading: { value: "var(--font-jersey)" },
                // body: { value: "var(--font-jersey)" },
                dancing: { value: "var(--font-dancing)" },
                jersey: { value: "var(--font-jersey)" },
                oswald: { value: "var(--font-oswald)" }
            },
        },
    },
})
const system = createSystem(defaultConfig, customConfig)

export function ProviderUI({ children }) {
    return (
        <ChakraProvider value={system}>
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
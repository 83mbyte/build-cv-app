'use client'
import { ChakraProvider, defaultConfig, defineConfig, createSystem } from '@chakra-ui/react';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/redux/store';


const customConfig = defineConfig({
    theme: {
        tokens: {
            fonts: {
                // heading: { value: "var(--font-jersey)" },
                // body: { value: "var(--font-jersey)" },
                // dancing: { value: "var(--font-dancing)" },
                // jersey: { value: "var(--font-jersey)" },
                // oswald: { value: "var(--font-oswald)" }
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

    const storeRef = useRef(null);
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore();
    }

    return (
        <Provider store={storeRef.current}>
            {children}
        </Provider>
    )
}
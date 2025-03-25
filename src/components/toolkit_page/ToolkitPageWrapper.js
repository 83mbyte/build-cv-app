'use client'

import { ProviderRedux, ProviderUI } from '@/app/providers';
import { Container, VStack } from '@chakra-ui/react';
import { Toaster } from "@/components/ui/toaster";
import FooterContainer from '../footerCopyright/FooterContainer';
import ToolkitHeader from './ToolkitHeader';


const ToolkitPageWrapper = ({ children }) => {
    return (
        <ProviderUI>
            <ProviderRedux>
                <VStack bg='' minH={'100vh'} justifyContent={'space-between'} p={['2', '6']}>
                    <ToolkitHeader />
                    <Container bg='' maxWidth={'4xl'} px={0}>
                        {children}

                    </Container>

                    <FooterContainer />
                </VStack>
                <Toaster />
            </ProviderRedux>
        </ProviderUI >
    );
};

export default ToolkitPageWrapper;
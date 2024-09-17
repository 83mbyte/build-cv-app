'use client'

import { Box, Container, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import IndexTopElement from './IndexTopElement';
import IndexFeaturesElement from './IndexFeaturesElement';
import IndexCoverElement from './IndexCoverElement';
import IndexFAQElement from './IndexFAQElement';
import FooterString from '../Footer/FooterString';

const IndexPageContainer = () => {
    return (
        <Box>
            <IndexTopElement />
            <IndexFeaturesElement />
            <IndexCoverElement />
            <IndexFAQElement />

            <Box w="full" my={3}>
                <Container
                    bg=''
                    as={Stack}
                    direction={{ base: 'column', md: 'row' }}
                    spacing={3}
                    px={2}
                    justify={{ base: 'center', md: 'space-between' }}
                    align={{ base: 'center', md: 'center' }}
                    fontSize={'xs'}
                >
                    <Text color={'lightgrey'}>{process.env.NEXT_PUBLIC_APP_NAME_FULL}</Text>
                    <FooterString />
                </Container></Box>
        </Box>
    );
};

export default IndexPageContainer;
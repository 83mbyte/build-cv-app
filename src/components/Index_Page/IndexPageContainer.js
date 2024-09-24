'use client'

import { Box } from '@chakra-ui/react';

import IndexTopElement from './IndexTopElement';
import IndexFeaturesElement from './IndexFeaturesElement';
import IndexCoverElement from './IndexCoverElement';
import IndexFAQElement from './IndexFAQElement';

const IndexPageContainer = () => {
    return (
        <Box>
            <IndexTopElement />
            <IndexFeaturesElement />
            <IndexCoverElement />
            <IndexFAQElement />
        </Box>
    );
};

export default IndexPageContainer;
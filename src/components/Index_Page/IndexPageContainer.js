'use client'

import { Box } from '@chakra-ui/react';

import IndexTopElement from './IndexTopElement';
import IndexFeaturesElement from './IndexFeaturesElement';
import IndexCoverElement from './IndexCoverElement';
import IndexFAQElement from './IndexFAQElement';
import IndexInterviewElement from './IndexInterviewElement';

const IndexPageContainer = () => {
    return (
        <Box>
            <IndexTopElement />
            <IndexFeaturesElement />
            <IndexCoverElement />
            <IndexInterviewElement />
            <IndexFAQElement />
        </Box>
    );
};

export default IndexPageContainer;
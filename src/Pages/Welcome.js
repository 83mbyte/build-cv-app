import { Box, VStack, } from '@chakra-ui/react';
import React from 'react';

import WelcomeTopElement from '../components/WelcomeComponents/WelcomeTopElement';
import WelcomeBlockImage from '../components/WelcomeComponents/WelcomeBlockImage';
import WelcomeFeatures from '../components/WelcomeComponents/WelcomeFeatures';

const Welcome = () => {



    return (
        <VStack w={'full'} spacing={0} borderColor={'gray.300'}  >
            <WelcomeTopElement />

            {/* <WelcomeBlockImage /> */}
            <WelcomeFeatures />
        </VStack >

    );
};

export default Welcome;



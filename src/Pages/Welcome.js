import { VStack, } from '@chakra-ui/react';
import React from 'react';

import WelcomeTopElement from '../components/WelcomeComponents/WelcomeTopElement';
import WelcomeFeatures from '../components/WelcomeComponents/WelcomeFeatures';
import WelcomeFAQ from '../components/WelcomeComponents/WelcomeFAQ';

const Welcome = () => {



    return (
        <VStack w={'full'} spacing={0} borderColor={'gray.300'}  >
            <WelcomeTopElement />
            <WelcomeFeatures />
            <WelcomeFAQ />
        </VStack >

    );
};

export default Welcome;



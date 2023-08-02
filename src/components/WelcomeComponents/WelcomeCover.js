import React from 'react';

import { Box, Heading, Text } from '@chakra-ui/react';
import { motion } from "framer-motion";

import WelcomeBlockImage from './WelcomeBlockImage';
import WelcomeWrapper from '../Wrappers/WelcomeWrapper';

const WelcomeCover = () => {
    return (
        <WelcomeWrapper bgColor={'teal'} textColor='white'>

            <Text textAlign={'center'} fontSize={['sm', 'lg']}>Create Your Cover Letter</Text>
            <Box as={motion.div}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1, transition: { delay: 0.3, duration: 0.8 } }}
                mx={'auto'} w={'full'}
            >

                <Heading as='h2' textAlign={'center'} bg='' size={['xl', 'xl']} mx={'auto'} >
                    Say goodbye to tedious formatting and lengthy writing.
                </Heading>
            </Box>

            <Box bg='' w={['xs', 'full']} >
                <Text color={'white'} textAlign={'center'} fontSize={['sm', 'md']} >Writing of a cover letter is easy as one-two-three. Our smart technology analyzes your skills, experiences, and qualifications to generate a polished cover letter.</Text>
            </Box>
            <WelcomeBlockImage imgName={'WelcomeCoverImg3.png'} />

        </WelcomeWrapper>
    )
};

export default WelcomeCover;
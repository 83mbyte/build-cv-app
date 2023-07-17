import React from 'react';

import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { motion } from "framer-motion";

import WelcomeBlockImage from './WelcomeBlockImage';

const WelcomeCover = () => {
    return (

        <Box
            bg='teal'
            w='full'
            py={'10'}
            pb={'0'}
            px={0}
            mx={2}
            borderTopWidth={'0'}
            borderColor={'gray.300'}
            borderLeft={'none'}
            borderRight={'none'}
            justifyContent={'center'}
            display={'flex'}
            flexDirection={'column'}
        >
            <VStack bg={''} w={['full', 'xl', '2xl']} mx={'auto'} spacing={'3'} mb={'25px'} color='white'>
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

            </VStack>

            <WelcomeBlockImage imgName={'WelcomeCoverImg3.png'} />
        </Box >
    )



};

export default WelcomeCover; 
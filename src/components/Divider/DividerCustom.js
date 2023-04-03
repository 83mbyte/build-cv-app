import { Divider, HStack, VStack, Box } from '@chakra-ui/react';
import React from 'react';

const DividerCustom = () => {
    return (

        <VStack spacing={0.5} mt={0} mb={3} border={'0px solid red'}>
            <HStack spacing={8} bg='' w="75%" mx={'auto'}>
                <Box bg={'gray.100'} w={'full'}><Divider /></Box>
                <Box bg={'gray.100'} w={'full'}><Divider /></Box>
            </HStack>
            <HStack spacing={6} bg='' w="55%" mx={'auto'}>
                <Box bg={'gray.50'} w={'full'}><Divider /></Box>
                <Box bg={'gray.50'} w={'full'}><Divider /></Box>
            </HStack>
            <HStack spacing={4} bg='' w="35%" mx={'auto'}>
                <Box bg={'gray.50'} w={'full'}><Divider /></Box>
                <Box bg={'gray.50'} w={'full'}><Divider /></Box>
            </HStack>
        </VStack>
    );
};

export default DividerCustom;
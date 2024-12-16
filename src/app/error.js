'use client'

import ButtonBackTo from '@/components/Buttons/ButtonBackTo';
import FooterString from '@/components/Footer/FooterString';
import { Box, Text, VStack, Heading } from '@chakra-ui/react';
import React from 'react';

const Error = ({
    error,
    reset,
}) => {

    return (
        <Box justifyContent={'center'} alignItems={'center'} height='100vh' display={'flex'} flexDirection={'column'}>
            <VStack spacing={1} justifyContent={'space-between'} h='100vh' p={5} w='100%'>
                <Box w='100%' my={5}>
                    <Heading as='h1' color={'teal'}>{process.env.NEXT_PUBLIC_APP_NAME_FULL}</Heading>
                </Box>
                <Box justifyContent={'center'} alignItems={'center'} display={'flex'} flexDirection={'column'}>
                    <Text>Something wrong happens..</Text>
                    {
                        error?.message &&
                        <>
                            <Box m={[1, 5]} p={5} backgroundColor={'lightgrey'} w={['sm', 'md']}>
                                <Text fontSize={'xs'} color='lightslategrey' >{error.message}</Text>
                            </Box>

                        </>
                    }
                    <Box>
                        <ButtonBackTo href='/' value='back to index' />
                    </Box>
                </Box>
                <FooterString />
            </VStack>

        </Box>
    );
};

export default Error;
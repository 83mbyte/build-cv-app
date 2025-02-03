'use client'

import { Box, Flex, VStack, Heading, Text, Button } from '@chakra-ui/react';

import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { LuChevronLeft } from "react-icons/lu";

import FooterContainer from '@/components/footerCopyright/FooterContainer';
import { ProviderUI } from './providers';

const Error = ({
    error,
    reset,
}) => {
    const router = useRouter();

    return (

        <ProviderUI>
            <VStack justifyContent={'space-between'} h='100vh' w='full' >
                <Heading as='h1' color={'teal'} my={5}>{process.env.NEXT_PUBLIC_APP_NAME_FULL}</Heading>
                <Flex bg='' flex={1} alignItems={'center'} direction={'column'} justifyContent={'center'}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.75 }}
                        animate={{ opacity: 1, scale: 1, transition: { delay: 0.1, duration: 0.4 } }}
                    >
                        <VStack gap={'6'}>

                            <Text>Something wrong happens..</Text>
                            {
                                error?.message &&
                                <>
                                    <Box m={[1, 5]} p={5} backgroundColor={'lightgrey'} w={['sm', 'md']}>
                                        <Text fontSize={'xs'} color='lightslategrey' >{error.message}</Text>
                                    </Box>
                                </>
                            }

                            <Box my={3}>
                                <Button
                                    colorPalette={'teal'}
                                    paddingX={2}
                                    size={['sm', 'md']}
                                    variant={'ghost'}
                                    onClick={() => router.back()}
                                >
                                    <LuChevronLeft /> back
                                </Button>
                            </Box>
                        </VStack>
                    </motion.div>
                </Flex>
                <FooterContainer />
            </VStack>
        </ProviderUI>
    );
};

export default Error;
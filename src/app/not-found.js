'use client'

import { ProviderUI } from './providers';
import { Flex, VStack, Heading, Text, Button, } from '@chakra-ui/react';

import { motion } from 'motion/react';
import { useRouter, } from 'next/navigation';

import { LuChevronLeft, } from "react-icons/lu";
import FooterContainer from '@/components/footerCopyright/FooterContainer';

const NotFound = () => {
    const router = useRouter();
    return (
        <ProviderUI>
            <VStack justifyContent={'space-between'} h='100vh' w='full'  >
                <Heading as='h1' color={'teal'} my={5}>{process.env.NEXT_PUBLIC_APP_NAME_FULL}</Heading>
                <Flex bg='' flex={1} alignItems={'center'} direction={'column'} justifyContent={'center'}>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.75 }}
                        animate={{ opacity: 1, scale: 1, transition: { delay: 0.1, duration: 0.4 } }}
                    >
                        <VStack gap={'6'}

                        >
                            <Heading as='h2' size={'2xl'} >Not Found</Heading>
                            <Text>Could not find requested resource..</Text>

                            <Button
                                colorPalette={'teal'}
                                paddingX={2}
                                size={['sm', 'md']}
                                variant={'ghost'}
                                onClick={() => router.back()}
                            >
                                <LuChevronLeft /> back
                            </Button>
                        </VStack>
                    </motion.div>
                </Flex>
                <FooterContainer />
            </VStack>
        </ProviderUI>

        // <ChakraProvider value={defaultSystem}>




        // </ChakraProvider>
    );
};

export default NotFound;
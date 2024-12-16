
import AnimationWrapper from '@/components/Animation/AnimationWrapper';
import ButtonBackTo from '@/components/Buttons/ButtonBackTo';
import FooterString from '@/components/Footer/FooterString';
import { Box, Heading, Text, VStack } from '@chakra-ui/react'


export default function NotFound() {
    return (
        <Box justifyContent={'center'} alignItems={'center'} height='100vh' display={'flex'} flexDirection={'column'} w='100%'>

            <VStack spacing={1} justifyContent={'space-between'} h='100vh' p={5} w='100%'>
                <Box w='100%' my={5}>
                    <Heading as='h1' color={'teal'}>{process.env.NEXT_PUBLIC_APP_NAME_FULL}</Heading>
                </Box>
                <AnimationWrapper>

                    <VStack>
                        <Heading as='h2'>Not Found</Heading>
                        <Text>Could not find requested resource</Text>
                        <Box my={3}>
                            <ButtonBackTo href='/' value={'back to index'} />
                        </Box>
                    </VStack>
                </AnimationWrapper>

                <FooterString />
            </VStack>
        </Box>

    )
}
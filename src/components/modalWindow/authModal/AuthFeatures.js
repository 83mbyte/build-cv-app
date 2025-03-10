import { List, Heading, Separator, Button, HStack, Text, VStack } from '@chakra-ui/react';

import { motion } from 'motion/react';


import { LuCircleCheckBig } from "react-icons/lu";
import { authData } from '@/lib/content-lib';

const AuthFeatures = ({ changeFormHandler }) => {

    const advantages = authData?.features?.data ?? ['item', 'item_2', 'item_3'];


    const buttonClickHandler = (type) => {
        if (type) {
            changeFormHandler(type);
        }
    }

    return (

        <motion.div
            style={{ width: '100%' }}
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, transition: { delay: 0.4, } }}
        >

            <VStack w='full' gap={3}>
                <Heading size={'lg'} as='h2'>
                    {authData?.features?.heading ?? 'Lorem ipsum'}
                </Heading>
                <List.Root gap="4" variant="plain" align="center" my={2}>
                    {
                        advantages.map((item, index) => {
                            return (
                                <List.Item key={index} gap={3}>
                                    <List.Indicator asChild color="green.300">
                                        <LuCircleCheckBig />
                                    </List.Indicator>
                                    {item}
                                </List.Item>
                            )
                        })
                    }

                </List.Root>
                <Button w='75%' size={['sm', 'md']} colorPalette={'teal'} onClick={() => buttonClickHandler('signup')}>Continue</Button>
                <Separator w='75%' mt={2} />
                <HStack bg='' >
                    <Text fontSize={['xs', 'sm']}>Already registered?</Text>
                    <Button variant={'plain'} _hover={{ opacity: 0.75 }} size={['xs', 'sm']} color='teal' onClick={() => buttonClickHandler('login')}>Log In to Continue</Button>
                </HStack>
            </VStack>
        </motion.div>

    )
}

export default AuthFeatures;
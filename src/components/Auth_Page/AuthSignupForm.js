import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import FormAuthContainer from '../FormItems/FormAuthContainer';
import InputCustom from '../FormItems/InputCustom';
import AlertCustom from '../Alert/AlertCustom';


const sizeBreakPoints = ['sm', 'md'];

const AuthSignupForm = ({ changeForm }) => {

    const [show, setShow] = useState(false);

    return (

        <FormAuthContainer title={'Sign Up'}>

            <form>
                <VStack w='full' bg='' mb={2} spacing={4} >

                    <InputCustom name='firstName' labelText='First Name' />
                    <InputCustom name='lastName' labelText='Last Name' />
                    <InputCustom name='email' labelText='Email' type='email' />
                    <InputCustom name='pass' labelText='Pass' type='password' />
                    {/* Error/Success message alert will be there */}
                    <Box
                        key={'signupFormAlert'}
                        as={motion.div}
                        layoutId='alertWrappSignup'
                        layout
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '',
                            height: show ? '50px' : 0,
                            maxHeight: '70px',
                            width: '100%',
                            padding: 0,
                            margin: 0,
                        }}
                    >

                        <AnimatePresence mode='wait'>
                            {
                                show &&
                                <AlertCustom type='info' message='Some text here..' />
                            }
                        </AnimatePresence>
                    </Box>

                    {/* Error/Success message alert will be there */}
                    <Box mb={2} w='full'>
                        <Button
                            w='full'
                            colorScheme={'teal'}
                            size={sizeBreakPoints} rounded={sizeBreakPoints}

                            onClick={(e) => { setShow(!show) }}
                        >Sign Up
                        </Button>
                    </Box>

                    <HStack w='full' justify={'center'} spacing={'0'} fontSize={'xs'} alignItems={'baseline'}>
                        <Text>Already registered? Please login</Text>
                        <Button variant={'link'} colorScheme={'teal'} fontSize={'xs'} mx={0} ml={'-0.5'} px={0} onClick={() => changeForm('login')}>here</Button>
                    </HStack>
                </VStack>
            </form>
        </FormAuthContainer>
    );
};

export default AuthSignupForm;
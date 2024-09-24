import { Box, Button, VStack, HStack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import InputCustom from '../FormItems/InputCustom';
import AlternativeSignInForm from '../FormItems/AlternativeSignInForm';
import AlternativeSignInBtn from '../Buttons/AlternativeSignInBtn';
import AlertCustom from '../Alert/AlertCustom';
import FormAuthContainer from '../FormItems/FormAuthContainer';

import { FcGoogle } from 'react-icons/fc';

const sizeBreakPoints = ['sm', 'md'];

const AuthLoginForm = ({ changeForm }) => {
    const [show, setShow] = useState(false);

    return (


        <FormAuthContainer title={'Sign In'}>
            <form>
                <VStack w='full' bg='' mb={2} spacing={4} >

                    <InputCustom name='email' labelText='Email' required />
                    <InputCustom name='pass' labelText='Password' type='password' required errorMessage='Must be at least 6 characters long.' />

                    {/* Error/Success message alert will be there */}
                    <Box
                        key={'loginFormAlert'}
                        as={motion.div}
                        layoutId='alertWrappLogin'
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
                        >Login
                        </Button>
                    </Box>


                    <HStack w='full' justify={'center'} spacing={'1'} fontSize={'xs'} alignItems={'baseline'}>
                        <Text>Not registered yet? Click to </Text>
                        <Button variant={'link'} colorScheme={'teal'} fontSize={'xs'} mx={0} px={0} onClick={() => changeForm('signup')} >Sign Up</Button>
                    </HStack>
                    <AlternativeSignInForm >
                        <AlternativeSignInBtn
                            providerName={'Google'}
                            sizeBreakPoints={sizeBreakPoints}
                            icon={<FcGoogle />}
                            onClickCallback={null}
                        />
                    </AlternativeSignInForm>
                </VStack></form>
        </FormAuthContainer>
    );
};

export default AuthLoginForm;



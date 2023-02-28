import { Alert, AlertIcon, Box, Button, Heading, HStack, Slide, Text, VStack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import CopyRights from '../components/CopyRights/CopyRights';
import InputCustom from '../components/FormElements/InputCustom';
import { authSignUp, clearAuthError } from '../redux/features/utility/utilitySlice';
import { auth } from '../__firebase/firebaseConf';

const SignUp = () => {
    const [formValue, setFormValue] = useState({ email: '', pass: '', name: '' });
    const [isVisible, setIsVisible] = useState(false);

    const sizeBreakPoints = ['sm', 'md'];
    const dispatch = useDispatch();

    const status = useSelector(state => state.utility.auth.status);
    const error = useSelector(state => state.utility.auth.error);
    const successMsg = useSelector(state => state.utility.auth.successMsg);

    const handleInputChange = (path, data) => {
        if (error !== '' || successMsg !== '') {
            dispatch(clearAuthError())
        };
        setFormValue({
            ...formValue,
            [path]: data
        });
    }

    const regBtnHandler = async () => {

        if (formValue.email !== '' && formValue.pass !== '' && formValue.pass.length >= 6) {

            dispatch(authSignUp({
                email: formValue.email,
                password: formValue.pass,
                auth
            }))
        }
    }
    const inputsArr = [
        {
            label: 'Full Name',
            name: 'name',
        },
        {
            label: 'Email',
            name: 'email',
        },
        {
            label: 'Password',
            name: 'pass',
        }

    ]

    useEffect(() => {
        if (!isVisible) {
            setIsVisible(true)
        }
    }, [])
    return (
        <Slide direction='top' in={isVisible}>
            <Box
                w={['full', 'full', 'lg']}
                p={[8, 10]}
                mt={[20, '15vh']}
                mx={'auto'}
                border={['none', '1px']}
                borderColor={['', 'gray.300']}
                borderRadius={10}
                bg={['', 'white']}
            >
                <VStack spacing={[3, 5]} w='full' align={['flex-start', 'center']}>
                    <VStack align={['flex-start', 'center']} w='full'>
                        <Heading as='h2' >SignUp</Heading>
                    </VStack>

                    {
                        inputsArr.map((item, index) => {
                            return <InputCustom labelText={item.label} defValue={formValue[item.name]} handleInputChange={handleInputChange} key={index} path={item.name} disabled={successMsg !== ''} />
                        })
                    }
                    {
                        (error !== '' || successMsg !== '')
                        && <Box w={'full'} p={2}  >
                            <Alert status={error !== '' ? 'error' : 'success'} fontSize={'sm'} rounded={sizeBreakPoints} >
                                <AlertIcon />
                                {error !== '' ? error : successMsg}
                            </Alert>
                        </Box>
                    }

                    <Box p={2} w='full'>
                        <Button
                            w='full'
                            colorScheme={'teal'}
                            size={sizeBreakPoints}
                            rounded={sizeBreakPoints}
                            onClick={regBtnHandler}
                            isDisabled={formValue.pass.length < 6 || successMsg !== '' || error !== ''}
                            isLoading={status === 'loading'}
                        >
                            Apply
                        </Button>
                    </Box>2
                    <HStack spacing={'-1'} fontSize={'xs'} alignItems={'baseline'}>
                        <Text>Already registered? Please login</Text>
                        <Button variant={'link'} colorScheme={'teal'} fontSize={'xs'} mx={0} px={0} as={RouterLink} to="/login" >here</Button>

                    </HStack>
                </VStack>
            </Box>
            <CopyRights />
        </Slide>
    );
};

export default SignUp;
import React, { Suspense, lazy, useEffect } from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    HStack, Box, Center, Flex, Container
} from '@chakra-ui/react';
import { BackIcon } from '../../Icons/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { getCoverLetter, inputCoverUpdate } from '../../../redux/features/coverLetter/coverLetterSlice';
import { setIsModifiedContent } from '../../../redux/features/utility/utilitySlice';

const CreateCover = lazy(() => import('./CreateCover'));
const GenerateCover = lazy(() => import('./GenerateCover'))

const DrawerCoverLetterContainer = ({ isOpen, setIsOpen }) => {
    const loggedUser = useSelector(state => state.utility.auth.data);
    const dispatch = useDispatch();

    const data = useSelector(state => state.cover.data);
    const status = useSelector(state => state.cover.status);
    const error = useSelector(state => state.cover.error);

    const onChangeHandler = (data) => {
        dispatch(setIsModifiedContent({ status: true, section: 'cover' }));
        dispatch(inputCoverUpdate({ value: data }));
    }

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getCoverLetter(loggedUser))
        }
    }, [status, dispatch, loggedUser])

    return (
        <Drawer onClose={() => setIsOpen({ visible: false, type: null })} isOpen={isOpen.visible} size={'full'} placement='left'>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader borderBottomWidth='1px'>
                    <HStack>
                        <Box bg='' onClick={() => setIsOpen({ visible: false, type: null })} >
                            <BackIcon />
                        </Box>
                        <Box w='full' >
                            <Center>Cover Letter</Center>
                        </Box>
                    </HStack>
                </DrawerHeader>
                <DrawerBody className='mainBg' >
                    <Flex bg='transparent' flexDirection={'column'} alignItems={'center'} justifyContent={'center'} w='full' h={'90%'}>
                        <Container
                            as='div'
                            bg={'white'}
                            border={'1px'}
                            borderColor={'gray.200'}
                            borderRadius={10}
                            maxW={'2xl'}
                            p={0} my={0}
                            mx={'auto'}
                            minH={'50vh'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            display={'flex'}
                            flexDirection={'column'}
                        >
                            {
                                isOpen.type === 'Create'
                                    ? <Suspense>
                                        <CreateCover state={{ data, status, error }} onChangeHandler={onChangeHandler} />
                                    </Suspense>

                                    : <Suspense>
                                        <GenerateCover resultObj={{ state: { data, status, error }, onChangeHandler }} />
                                    </Suspense>

                            }
                        </Container>
                    </Flex>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default DrawerCoverLetterContainer;




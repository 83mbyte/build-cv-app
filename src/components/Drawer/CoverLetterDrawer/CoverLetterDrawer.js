import { Suspense, useEffect, lazy } from 'react';
import {
    DrawerBody,
    DrawerHeader,
    Box,
    HStack, Center, Flex, Container
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { coverLettDrawerIsOpenToggle, setIsModifiedContent } from '@/redux/features/utility/utilitySlice';
import { getCoverLetter, inputCoverUpdate } from '@/redux/features/coverLetter/coverLetterSlice';

import ToolTip from '@/components/ToolTip/ToolTip';
import { BackIcon } from '@/components/Icons/Icon';


const CreateCover = lazy(() => import('./CreateCover/CreateCover'));
const GenerateCover = lazy(() => import('./GenerateCover/GenerateCover'));

const CoverLetterDrawer = () => {

    const dispatch = useDispatch();

    const userLogged = useSelector(state => state.auth.auth.data);
    const type = useSelector(state => state.utility.coverLettDrawer.type);
    const data = useSelector(state => state.cover.data);
    const status = useSelector(state => state.cover.status);
    const error = useSelector(state => state.cover.error);

    const onChangeHandler = (data) => {
        dispatch(setIsModifiedContent({ status: true, section: 'cover' }));
        dispatch(inputCoverUpdate({ value: data }));
    }


    useEffect(() => {
        if (status === 'idle' && userLogged) {
            dispatch(getCoverLetter(userLogged))
        }
    }, [status, dispatch, userLogged])


    return (

        <>
            <DrawerHeader borderBottomWidth='1px' py={[2, 4]}>

                <HStack>
                    <Box bg='' onClick={() => dispatch(coverLettDrawerIsOpenToggle())} >
                        <ToolTip label='back to dashboard'>
                            <BackIcon />
                        </ToolTip>
                    </Box>
                    <Box w='full' >
                        <Center>Cover Letter</Center>
                    </Box>
                </HStack>
            </DrawerHeader>

            <DrawerBody className='mainBg'>
                <Flex bg='transparent' flexDirection={'column'} alignItems={'center'} justifyContent={'center'} w='full' h={'90%'} p={0}>
                    <Container
                        as='div'
                        bg={'white'}
                        border={'1px'}
                        borderColor={'gray.200'}
                        borderRadius={10}
                        maxW={'2xl'}
                        p={0}
                        m={0}
                        // mx={'auto'}
                        minH={'50vh'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        display={'flex'}
                        flexDirection={'column'}
                        overflowY={'scroll'}
                    >
                        {
                            type === 'Create'
                                ? <Suspense><CreateCover state={{ data, status, error }} onChangeHandler={onChangeHandler} /></Suspense>
                                : <Suspense>
                                    <GenerateCover accessToken={userLogged?.accessToken} />
                                </Suspense>
                        }
                    </Container>
                </Flex>
            </DrawerBody>
        </>

    );
};

export default CoverLetterDrawer;
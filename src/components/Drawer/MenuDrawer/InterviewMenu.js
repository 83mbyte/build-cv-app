import { Suspense, lazy, useEffect } from 'react';
import { VStack, Button, Heading, Badge, HStack, Box } from '@chakra-ui/react';

import { useSelector, useDispatch } from 'react-redux';
import { interviewDrawerIsOpenToggle } from '@/redux/features/utility/utilitySlice';

import { MdAutoAwesome } from "react-icons/md";
import { getPaidServicesThunk } from '@/redux/features/paidServices/paidServicesSlice';

const DrawerContainer = lazy(() => import('../DrawerContainer'));
const InterviewDrawer = lazy(() => import('../InterviewDrawer/InterviewDrawer'));

const InterviewMenu = () => {
    const dispatch = useDispatch();
    const userLogged = useSelector(state => state.auth.auth.data);
    const isPaidServicesAllowed = useSelector(state => state.paidServices.data.pdf.isAllowed);
    const statusPaidServices = useSelector(state => state.paidServices.status);
    const isOpen = useSelector(state => state.utility.interviewDrawer.isOpen);
    const onClickBtnHandler = (type) => {

        if (type) {
            dispatch(interviewDrawerIsOpenToggle({ type: type }))
        } else {
            dispatch(interviewDrawerIsOpenToggle())
        }
    }

    useEffect(() => {
        if (statusPaidServices === 'idle' && userLogged) {
            dispatch(getPaidServicesThunk(userLogged));
        }
    }, [statusPaidServices, userLogged, dispatch])
    return (
        <VStack spacing={1} >
            <Heading as={'h5'} size={'xs'} mb={1} w='full'>Prepare To Interview</Heading>

            <HStack w='full' spacing={0} alignItems={'center'} >

                {!isPaidServicesAllowed &&
                    <Box display='flex' bg='' flex={1}>
                        <Badge fontSize={'9px'} variant='outline' colorScheme='orange'>Unlocks after payment</Badge>
                    </Box>
                }

                <Box display='flex' bg='' flex={1}>
                    <Button isDisabled={!isPaidServicesAllowed} style={{ justifyContent: 'flex-start' }} w='full' size={'sm'} colorScheme={'teal'} variant={'ghost'} leftIcon={<MdAutoAwesome />} onClick={() => onClickBtnHandler('Start')}>{!isPaidServicesAllowed ? 'Start' : 'Start simulation'}</Button>
                </Box>
            </HStack>

            <Suspense>
                <DrawerContainer keyId='interviewDrawer' isOpen={isOpen} size='full'>
                    <InterviewDrawer />
                </DrawerContainer>
            </Suspense>
        </VStack>
    );
};

export default InterviewMenu;
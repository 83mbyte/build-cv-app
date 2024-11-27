import { Suspense, lazy } from 'react';
import { VStack, Button, Heading, Badge } from '@chakra-ui/react';

import { useSelector, useDispatch } from 'react-redux';
import { interviewDrawerIsOpenToggle } from '@/redux/features/utility/utilitySlice';

import { MdAutoAwesome } from "react-icons/md";

const DrawerContainer = lazy(() => import('../DrawerContainer'));
const InterviewDrawer = lazy(() => import('../InterviewDrawer/InterviewDrawer'));

const InterviewMenu = () => {
    const dispatch = useDispatch();
    const isPaidServicesAllowed = useSelector(state => state.paidServices.data.pdf.isAllowed);
    const isOpen = useSelector(state => state.utility.interviewDrawer.isOpen);
    const onClickBtnHandler = (type) => {

        if (type) {
            dispatch(interviewDrawerIsOpenToggle({ type: type }))
        } else {
            dispatch(interviewDrawerIsOpenToggle())
        }
    }
    return (
        <VStack spacing={1} >
            <Heading as={'h5'} size={'xs'} mb={1} w='full'>Prepare To Interview</Heading>

            {!isPaidServicesAllowed &&
                <Badge fontSize={'9px'} variant='outline' mb={-2} colorScheme='orange'>Unlocks after payment</Badge>}

            <Button isDisabled={!isPaidServicesAllowed} style={{ justifyContent: 'flex-start' }} w='full' size={'sm'} colorScheme={'teal'} variant={'ghost'} leftIcon={<MdAutoAwesome />} onClick={() => onClickBtnHandler('Start')}>Start simulation</Button>

            <Suspense>
                <DrawerContainer keyId='interviewDrawer' isOpen={isOpen} size='full'>
                    <InterviewDrawer />
                </DrawerContainer>
            </Suspense>
        </VStack>
    );
};

export default InterviewMenu;
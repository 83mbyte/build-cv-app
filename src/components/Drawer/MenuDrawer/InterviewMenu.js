import { VStack, Button, Heading, } from '@chakra-ui/react';
import { Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { interviewDrawerIsOpenToggle } from '@/redux/features/utility/utilitySlice';

import { MdAutoAwesome } from "react-icons/md";

import DrawerContainer from '../DrawerContainer';
import InterviewDrawer from '../InterviewDrawer/InterviewDrawer';

const InterviewMenu = () => {
    const dispatch = useDispatch();
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
            <Heading as={'h5'} size={'xs'} mb={1} w='full'>Prepare to Interview</Heading>

            <Button style={{ justifyContent: 'flex-start' }} w='full' size={'sm'} colorScheme={'teal'} variant={'ghost'} leftIcon={<MdAutoAwesome />} onClick={() => onClickBtnHandler('Start')}>Start interview</Button>

            <Suspense>
                <DrawerContainer keyId='interviewDrawer' isOpen={isOpen} size='full'>
                    <InterviewDrawer />
                </DrawerContainer>
            </Suspense>
        </VStack>
    );
};

export default InterviewMenu;
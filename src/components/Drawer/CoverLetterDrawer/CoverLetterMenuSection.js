import {
    Box,
    Badge,
    Button, HStack, Heading, VStack, Wrap, WrapItem
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { coverLettDrawerIsOpenToggle } from '@/redux/features/utility/utilitySlice';

import { IoDocumentTextOutline, IoBulbOutline } from "react-icons/io5";
import { Suspense } from 'react';
import DrawerContainer from '../DrawerContainer';
import CoverLetterDrawer from './CoverLetterDrawer';

const CoverLetterMenuSection = () => {

    const isPaidServicesAllowed = useSelector(state => state.paidServices.data.pdf.isAllowed);

    const type = useSelector(state => state.utility.coverLettDrawer.type)
    const isOpen = useSelector(state => state.utility.coverLettDrawer.isOpen)
    const dispatch = useDispatch();



    const onClickBtnHandler = (type) => {

        if (type) {
            dispatch(coverLettDrawerIsOpenToggle({ type: type }));
        } else {
            dispatch(coverLettDrawerIsOpenToggle());
        }
    }

    return (
        <VStack spacing={1} >
            <Heading as={'h5'} size={'xs'} mb={1} w='full'>Cover Letter</Heading>

            <Button style={{ justifyContent: 'flex-start' }} w='full' size={'sm'} colorScheme={'teal'} variant={'ghost'} leftIcon={<IoDocumentTextOutline />} onClick={() => onClickBtnHandler('Create')}>New / Edit</Button>

            <HStack w='full' spacing={0} alignItems={'center'}>
                {!isPaidServicesAllowed &&
                    <Box bg='' display='flex' flex={1}>
                        <Badge fontSize={'9px'} variant='outline' colorScheme='orange'>Unlocks after payment</Badge>
                    </Box>
                }
                <Box display='flex' bg='' flex={1}>
                    <Button isDisabled={!isPaidServicesAllowed} style={{ justifyContent: 'flex-start' }} size={'sm'} colorScheme={'teal'} variant={'ghost'} leftIcon={<IoBulbOutline />} onClick={() => onClickBtnHandler('Generate')}>Generate</Button>
                </Box>

            </HStack>

            <Suspense>
                <DrawerContainer keyId='coverLetterDrawer' isOpen={isOpen} size='full'>
                    <CoverLetterDrawer />
                </DrawerContainer>
            </Suspense>
        </VStack>

    )
};

export default CoverLetterMenuSection;
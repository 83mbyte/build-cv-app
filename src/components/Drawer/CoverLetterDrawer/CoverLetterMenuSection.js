import {
    Button, Heading, VStack, Wrap, WrapItem
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { coverLettDrawerIsOpenToggle } from '@/redux/features/utility/utilitySlice';

import { IoDocumentTextOutline, IoBulbOutline } from "react-icons/io5";
import { Suspense } from 'react';
import DrawerContainer from '../DrawerContainer';
import CoverLetterDrawer from './CoverLetterDrawer';

const CoverLetterMenuSection = () => {

    const type = useSelector(state => state.utility.coverLettDrawer.type)
    const isOpen = useSelector(state => state.utility.coverLettDrawer.isOpen)
    const dispatch = useDispatch();



    const onClickBtnHandler = (type) => {

        if (type) {
            dispatch(coverLettDrawerIsOpenToggle({ type: type }))
        } else {
            dispatch(coverLettDrawerIsOpenToggle())
        }
    }

    return (
        <VStack spacing={1} >
            <Heading as={'h5'} size={'xs'} mb={1} w='full'>Cover Letter</Heading>

            <Button style={{ justifyContent: 'flex-start' }} w='full' size={'sm'} colorScheme={'teal'} variant={'ghost'} leftIcon={<IoDocumentTextOutline />} onClick={() => onClickBtnHandler('Create')}>New / Edit</Button>

            <Button style={{ justifyContent: 'flex-start' }} w='full' size={'sm'} colorScheme={'teal'} variant={'ghost'} leftIcon={<IoBulbOutline />} onClick={() => onClickBtnHandler('Generate')}>Generate</Button>
            <Suspense>
                <DrawerContainer keyId='coverLetterDrawer' isOpen={isOpen} size='full'>
                    <CoverLetterDrawer />
                </DrawerContainer>
            </Suspense>
        </VStack>

    )
};

export default CoverLetterMenuSection;
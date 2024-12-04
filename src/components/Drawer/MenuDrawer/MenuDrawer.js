import { DrawerHeader, HStack, Box, Text, DrawerFooter, Button, DrawerBody } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { signOutThunk } from '@/redux/features/auth/authSlice';

import { CloseIcon } from '../../Icons/Icon';
import ToolTip from '../../ToolTip/ToolTip';
import AddMoreSections from './AddMoreSections';
import CoverLetterSection from '../CoverLetterDrawer/CoverLetterMenuSection';
import InterviewMenu from './InterviewMenu';
import BalanceSection from './BalanceSection';


const MenuDrawer = ({ onCloseHandler }) => {
    const dispatch = useDispatch();

    const signOutHandler = () => {
        dispatch(signOutThunk())
    }
    return (
        // render in the drawer container
        <>
            <DrawerHeader padding={0}>
                <HStack alignItems={'center'} justifyContent='center' borderBottomWidth='1px' padding={2} >
                    <Box display={'flex'} w='full' alignItems={'center'} justifyContent={'center'} >
                        <Text>Menu</Text>
                    </Box>
                    <Box display={'flex'} onClick={onCloseHandler} alignItems={'center'} justifyContent={'center'}  >
                        <ToolTip label={'close menu'}>
                            <CloseIcon />
                        </ToolTip>
                    </Box>
                </HStack>
            </DrawerHeader>
            <DrawerBody borderBottomWidth='1px' p={0}>
                <Box borderBottomWidth='1px' px={6} pt={3} pb={5}>

                    <AddMoreSections />
                </Box>
                <Box borderBottomWidth='1px' px={6} pt={3} pb={5}>

                    <CoverLetterSection />
                </Box>
                <Box borderBottomWidth='1px' px={6} pt={3} pb={5}>
                    <InterviewMenu />
                </Box>
                <Box borderBottomWidth='0px' px={6} pt={3} pb={5}>
                    <BalanceSection />
                </Box>


            </DrawerBody>
            <DrawerFooter>
                <Box w='full'>
                    <Button colorScheme='red' w={'full'} onClick={signOutHandler} width={'100%'} >Sign Out</Button>
                </Box>
            </DrawerFooter>
        </>
    );
};

export default MenuDrawer;

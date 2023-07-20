import {
    Box, Button, Portal,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    HStack,
} from '@chakra-ui/react';
import React from 'react';

import { useDispatch } from 'react-redux';
import { authLogout } from '../../redux/features/utility/utilitySlice';

import AddMoreSections from './AddMoreSections';
import { CloseIcon } from '../Icons/Icon';
import CoverLetterSection from './CoverLetterSection/CoverLetterSection';

const DrawerContainer = ({ isOpenProp, onCloseHandler }) => {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(authLogout())
    }

    return (
        <Portal>
            <Drawer
                isOpen={isOpenProp}
                placement='right'
                onClose={onCloseHandler}
                autoFocus={false}
                preserveScrollBarGap={true}
                returnFocusOnClose={false}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px' >
                        <HStack alignItems={'center'}>
                            <Box flex={1} alignItems={'center'}>Menu</Box>
                            <Box bg='' onClick={onCloseHandler} >
                                <CloseIcon />
                            </Box>
                        </HStack>
                    </DrawerHeader>

                    <DrawerBody borderBottomWidth='1px' p={0}>
                        <Box borderBottomWidth='1px' px={6} py={3}>

                            <AddMoreSections />
                        </Box>
                        <Box borderBottomWidth='1px' px={6} py={3}>

                            <CoverLetterSection />
                        </Box>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button colorScheme='teal' w={'full'} onClick={logoutHandler}>Logout</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Portal>
    )
};

export default DrawerContainer;
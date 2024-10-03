'use client'

import { Box, Flex, Container, HStack, IconButton, Button, } from '@chakra-ui/react';
import { Suspense, lazy } from 'react';
import { MdPreview, MdSave, MdMenu } from 'react-icons/md';

import { useDispatch, useSelector } from 'react-redux';
import { menuDrawerIsOpenToggle, previewDrawerIsOpenToggle } from '@/redux/features/utility/utilitySlice';

import ToolTip from '@/components/ToolTip/ToolTip';
import HeaderLogo from './HeaderLogo';

const DrawerContainer = lazy(() => import('@/components/Drawer/DrawerContainer'));
const MenuDrawer = lazy(() => import('@/components/Drawer/MenuDrawer/MenuDrawer'));
const PreviewDrawer = lazy(() => import('@/components/Drawer/PreviewDrawer/PreviewDrawer'));

const DashboardHeaderContainer = () => {
    const isMenuDrawerOpen = useSelector(state => state.utility.menuDrawer.isOpen);
    const isPreviewDrawerOpen = useSelector(state => state.utility.previewDrawer.isOpen);

    const dispatch = useDispatch();
    const toogleMenuDrawer = () => {
        dispatch(menuDrawerIsOpenToggle());
    }

    const tooglePreviewDrawer = () => {
        dispatch(previewDrawerIsOpenToggle());
    }
    return (
        <Flex position="fixed" backgroundColor="white" bg='rgb(250,250,250)' p={1} boxShadow={'0px 1px 3px 0px rgba(0, 0, 0, 0.25)'} w='full' zIndex={1212} as='header'>

            <Container maxW={'3xl'} py={1} px={['10px', '10px', '20px']} bg={'transparent'}>
                <HStack justify={'space-between'} align='center'>
                    <Box>
                        <HeaderLogo />
                    </Box>
                    <HStack spacing={2} p={0}>
                        <Box>
                            <ToolTip label='preview document'>
                                <Button
                                    variant={'solid'}
                                    colorScheme={'teal'}
                                    size={'xs'}
                                    leftIcon={<MdPreview />}
                                    onClick={tooglePreviewDrawer}

                                >Preview</Button>
                            </ToolTip>
                            <Suspense>
                                <DrawerContainer keyId='previewDrawer' isOpen={isPreviewDrawerOpen} size='full'>
                                    <PreviewDrawer onCloseHandler={tooglePreviewDrawer} />
                                </DrawerContainer>
                            </Suspense>

                        </Box>

                        <Box>
                            <ToolTip label={'open menu'}>
                                <IconButton
                                    colorScheme='teal'
                                    icon={<MdMenu />}
                                    size={'xs'}
                                    variant={'outline'}
                                    aria-label='show menu'
                                    onClick={toogleMenuDrawer}
                                    fontSize={'16px'}
                                />
                            </ToolTip>
                            <Suspense>
                                <DrawerContainer placement='right' isOpen={isMenuDrawerOpen} keyId={'menuDrawer'}>
                                    <MenuDrawer onCloseHandler={toogleMenuDrawer} />
                                </DrawerContainer>
                            </Suspense>
                        </Box>
                    </HStack>
                </HStack>
            </Container>
        </Flex>
    );
};

export default DashboardHeaderContainer;
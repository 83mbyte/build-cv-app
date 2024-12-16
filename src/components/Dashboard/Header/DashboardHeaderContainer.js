'use client'

import { Box, Flex, Container, HStack, IconButton, Button, useToast } from '@chakra-ui/react';
import { Suspense, lazy, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { MdPreview, MdMenu } from 'react-icons/md';

import store from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { menuDrawerIsOpenToggle, previewDrawerIsOpenToggle, putDataOnServerThunk, putAdditionalSectionsOnServerThunk } from '@/redux/features/utility/utilitySlice';

import ToolTip from '@/components/ToolTip/ToolTip';
import HeaderLogo from './HeaderLogo';
import { paymentsToastData } from '@/lib/content-lib';

const DrawerContainer = lazy(() => import('@/components/Drawer/DrawerContainer'));
const MenuDrawer = lazy(() => import('@/components/Drawer/MenuDrawer/MenuDrawer'));
const PreviewDrawer = lazy(() => import('@/components/Drawer/PreviewDrawer/PreviewDrawer'));

const DashboardHeaderContainer = () => {
    const searchParamsOriginal = useSearchParams();
    const payment_pdf = searchParamsOriginal.get('payment_pdf');
    const params = useMemo(() => {
        return new URLSearchParams(searchParamsOriginal.toString());
    }, []);

    if (params.has('payment_pdf')) {
        params.delete('payment_pdf');
        history.replaceState(null, "", "dashboard");
    }

    const toastIdSuccess = 'scss';
    const toastIdCancel = 'cncl';
    const toast = useToast({
        variant: 'left-accent',
        position: 'top-right',
        isClosable: true,
        duration: 5000
    });



    const isMenuDrawerOpen = useSelector(state => state.utility.menuDrawer.isOpen);
    const isPreviewDrawerOpen = useSelector(state => state.utility.previewDrawer.isOpen);
    const isModifiedContent = useSelector(state => state.utility.isModifiedContent);
    const userLogged = useSelector(state => state.auth.auth.data);

    const additionalSections = useSelector(state => state.utility.additionalSections.data);
    const isModifiedAdditionalSections = useSelector(state => state.utility.additionalSections.modified);
    const dispatch = useDispatch();

    const saveUserProvidedData = () => {
        // save data from user on server..
        if (isModifiedContent.sections.length > 0) {

            let state = store.getState();
            for (const section of isModifiedContent.sections) {
                dispatch(putDataOnServerThunk(
                    {
                        user: userLogged.userId,
                        token: userLogged.accessToken,
                        section,
                        data: {
                            __serv: { ...state[section].__serv },
                            data: state[section].data
                        }
                    }
                ))
            }
        }
        if (isModifiedAdditionalSections) {
            dispatch(putAdditionalSectionsOnServerThunk({
                user: userLogged.userId,
                token: userLogged.accessToken,
                data: additionalSections
            }));
        }
    }
    const toogleMenuDrawer = () => {
        dispatch(menuDrawerIsOpenToggle());
        saveUserProvidedData();
    }

    const tooglePreviewDrawer = () => {
        dispatch(previewDrawerIsOpenToggle());
        saveUserProvidedData();
    }

    useEffect(() => {
        if (payment_pdf && !toast.isActive(toastIdSuccess) && !toast.isActive(toastIdCancel)) {
            tooglePreviewDrawer();
            switch (payment_pdf) {
                case 'success':
                    toast({ title: paymentsToastData.pdf.success.title || `Earum exercitationem culpa!`, description: paymentsToastData.pdf.success.descr || `Ad architecto vero debitis voluptas!`, status: 'success', id: toastIdSuccess });
                    break;
                case 'cancel':
                    toast({ title: paymentsToastData.pdf.cancel.title || `Lorem ipsum dolor.`, description: paymentsToastData.pdf.cancel.descr || `Sit amet consectetur adipisicing elit.`, status: 'error', id: toastIdCancel });
                default:
                    break;
            }
        }
    }, [])
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
                                <DrawerContainer placement='right' isOpen={isMenuDrawerOpen} keyId={'menuDrawer'} onCloseHandler={toogleMenuDrawer}>
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
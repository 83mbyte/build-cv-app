import {
    Box, Button, Container, Flex, HStack, IconButton
} from '@chakra-ui/react';
import React, { Suspense, lazy } from 'react';

import { Link as RouterLink } from 'react-router-dom';
import { MdPreview, MdSave, MdMenu } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { drawerIsOpenToggle, putAdditionalSectionsOnServerThunk, putDataOnServerThunk } from '../../redux/features/utility/utilitySlice';

import ToolTip from '../Tooltip/ToolTip';
import HeaderLogo from './HeaderLogo';
import AvatarCustom from '../Avatar/AvatarCustom';

import store from '../../redux/store';

const DrawerContainer = lazy(() => import('../Drawer/DrawerContainer'))


const HeaderContainer = ({ loggedUser }) => {

    const dispatch = useDispatch();
    const isModifiedContent = useSelector(state => state.utility.isModifiedContent);
    const isDrawerOpen = useSelector(state => state.utility.drawer.isOpen);
    const isPreviewDrawerOpen = useSelector(state => state.utility.previewDrawer.isOpen);
    const additionalSections = useSelector(state => state.utility.additionalSections.data);


    const saveAllChanges = () => {
        let state = store.getState();
        for (const section of isModifiedContent.sections) {
            dispatch(putDataOnServerThunk(
                {
                    user: loggedUser.userId,
                    token: loggedUser.accessToken,
                    section,
                    data: {
                        __serv: { ...state[section].__serv },
                        data: state[section].data
                    }
                }
            ))
        }
    }

    const saveClickHandler = () => {
        saveAllChanges();
    }
    const drawerToggler = () => {
        dispatch(drawerIsOpenToggle());
        saveAllChanges();
        if (isDrawerOpen) {
            dispatch(putAdditionalSectionsOnServerThunk({
                user: loggedUser.userId,
                token: loggedUser.accessToken,
                data: additionalSections
            }))
        }
    }

    return (
        <Flex position="fixed" backgroundColor="white" bg='rgb(250,250,250)' p={1} boxShadow={'0px 1px 3px 0px rgba(0, 0, 0, 0.25)'} w='full' zIndex={1212} as='header'>
            <Container maxW={'3xl'} py={1} px={['10px', '10px', '20px']} bg={'transparent'}>
                <HStack justify={'space-between'} align='center'>
                    <HeaderLogo />
                    <HStack spacing={2} p={0}>


                        <Box>
                            <ToolTip label={'preview document'} isDisabled={isPreviewDrawerOpen}>

                                <Button
                                    variant={'solid'}
                                    colorScheme={'teal'}
                                    as={RouterLink}
                                    to="/dashboard/preview"
                                    size={'xs'}
                                    leftIcon={<MdPreview />}
                                    onClick={saveAllChanges}
                                >Preview</Button>
                            </ToolTip>

                        </Box>

                        <Box>
                            <ToolTip label='save changes' >
                                <Button
                                    variant={'outline'}
                                    colorScheme='teal'
                                    size={'xs'}
                                    leftIcon={<MdSave />}
                                    isDisabled={!isModifiedContent.status}
                                    onClick={saveClickHandler}
                                    className={isModifiedContent.status && 'btnPulse'}

                                >Save</Button>
                            </ToolTip>
                        </Box>

                        <Box>
                            <ToolTip label='open menu'>
                                <IconButton
                                    colorScheme='teal'
                                    icon={<MdMenu />}
                                    size={'xs'}
                                    variant={'outline'}
                                    aria-label='show menu'
                                    onClick={drawerToggler}
                                    fontSize={'16px'}
                                />
                            </ToolTip>
                            <Suspense>
                                <DrawerContainer isOpenProp={isDrawerOpen} onCloseHandler={drawerToggler} />
                            </Suspense>
                        </Box>
                        <Box>
                            <AvatarCustom name={''} />
                        </Box>
                    </HStack>

                </HStack>
            </Container>
        </Flex>
    );
};


export default HeaderContainer;
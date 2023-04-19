import {
    Box, Button, Container, Flex, HStack, IconButton
} from '@chakra-ui/react';
import React from 'react';

import { MdPreview, MdSave, MdMoreHoriz } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { drawerIsOpenToggle, modalIsOpenToggle, putDataOnServerThunk } from '../../redux/features/utility/utilitySlice';

import ToolTip from '../Tooltip/ToolTip';
import HeaderLogo from './HeaderLogo';
import AvatarCustom from '../Avatar/AvatarCustom';
import DrawerContainer from '../Drawer/DrawerContainer';


const HeaderContainer = ({ loggedUser }) => {

    const modalOpen = useSelector(state => state.utility.modalWindow.isOpen);
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const isModifiedContent = useSelector(state => state.utility.isModifiedContent);
    const isDrawerOpen = useSelector(state => state.utility.drawer.isOpen);


    const saveAllChanges = () => {
        for (const section of isModifiedContent.sections) {
            dispatch(putDataOnServerThunk(
                {
                    user: loggedUser.userId,
                    section,
                    data: {
                        __serv: { ...state[section].__serv },
                        data: state[section].data
                    }
                }
            ))
        }
    }

    const previewClickHandler = () => {
        dispatch(modalIsOpenToggle());
        saveAllChanges();
    }

    const saveClickHandler = () => {
        saveAllChanges();
    }
    const drawerToggler = () => {
        dispatch(drawerIsOpenToggle());
        saveAllChanges();
    }

    return (
        <Flex position="fixed" backgroundColor="white" bg='rgb(250,250,250)' p={1} boxShadow={'0px 1px 3px 0px rgba(0, 0, 0, 0.25)'} w='full' zIndex={1212} as='header'>
            <Container maxW={'3xl'} py={1} px={['10px', '10px', '20px']} bg={'transparent'}>
                <HStack justify={'space-between'} align='center'>
                    <HeaderLogo />
                    <HStack spacing={2} p={0}>
                        <Box>
                            <ToolTip label={'preview document'} isDisabled={modalOpen}>
                                <Button
                                    variant={'solid'}
                                    colorScheme='teal'
                                    size={'xs'}
                                    leftIcon={<MdPreview />}
                                    onClick={previewClickHandler}
                                >
                                    Preview
                                </Button>
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
                                    icon={<MdMoreHoriz />}
                                    size={'xs'}
                                    variant={'outline'}
                                    aria-label='show menu'
                                    onClick={drawerToggler}
                                    fontSize={'16px'}
                                />
                            </ToolTip>
                            <DrawerContainer isOpenProp={isDrawerOpen} onCloseHandler={drawerToggler} />
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
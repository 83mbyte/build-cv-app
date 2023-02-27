import { HStack, Box, Button, Container } from '@chakra-ui/react';
import React from 'react';
import { MdPreview, MdSave } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import AvatarCustom from '../components/Avatar/AvatarCustom';
import ToolTip from '../components/ToolTip/ToolTip';
import { authLogout, modalIsOpenToggle, putDataOnServer } from '../redux/features/utility/utilitySlice';
import '../App.css';

import { auth } from '../__firebase/firebaseConf';
import HeaderLogo from '../components/HeaderLogo/HeaderLogo';

const HeaderContainer = ({ user, }) => {
    const isModified = useSelector(state => state.utility.isModifiedContent);
    const state = useSelector(state => state)
    const name = useSelector(state => state.personDetails.data.name);
    const modalOpen = useSelector(state => state.utility.modalWindow.isOpen);

    const dispatch = useDispatch();

    const logoutUser = () => {
        dispatch(authLogout(auth))
    }
    const clickSaveHandler = () => {
        for (const section of isModified.sections) {

            if (section === 'skills') {
                dispatch(putDataOnServer({
                    user,
                    path: section,
                    value: {
                        data: state[section].data,
                        __serv: {
                            isSectionVisible: state[section].isSectionVisible,
                            isSwitchChecked: state[section].isSwitchChecked,
                        }
                    }
                }));
            } else if (section === 'courses' || section === 'employmentHistory' || section === 'languages') {
                dispatch(putDataOnServer({
                    user,
                    path: section,
                    value: {
                        data: state[section].data,
                        __serv: {
                            isSectionVisible: state[section].isSectionVisible
                        }
                    }
                }));
            } else if (section === 'references') {
                dispatch(putDataOnServer({
                    user,
                    path: section,
                    value: {
                        data: state[section].data,
                        __serv: {
                            isSectionVisible: state[section].isSectionVisible,
                            isSwitchChecked: state[section].isSwitchChecked
                        }
                    }
                }));
            }
            else {
                dispatch(putDataOnServer({
                    user, path: section,
                    value: {
                        data: state[section].data,
                        __serv: {
                            isSectionVisible: state[section].isSectionVisible,
                        }

                    }
                }));
            }
        }

    }
    const clickPreviewHandler = () => {
        dispatch(modalIsOpenToggle());
    }
    return (
        <Box bg='rgb(250,250,250)' p={1} boxShadow={'0px 1px 3px 0px rgba(0, 0, 0, 0.25)'} position='fixed' w='full' zIndex={1212} as='header'>
            <Container maxW={'3xl'} py={1} px={['10px', '10px', '20px']} bg={'transparent'}>
                <HStack justify={'space-between'} align='center'>
                    <HeaderLogo />
                    <HStack spacing={2} p={0}>
                        <Box>
                            <ToolTip label={'preview document'} isDisabled={modalOpen}>
                                <Button variant={'solid'} colorScheme='teal' size={'xs'} leftIcon={<MdPreview />}
                                    onClick={clickPreviewHandler}
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
                                    isDisabled={!isModified.status}
                                    onClick={clickSaveHandler}
                                    className={isModified.status && 'btnPulse'}

                                >Save</Button>
                            </ToolTip>

                        </Box>
                        <AvatarCustom name={(name.firstName.value !== '' || name.lastName.value !== '') ? `${name.firstName.value} ${name.lastName.value}` : ''} onClickHandler={logoutUser} />
                    </HStack>
                </HStack>
            </Container>
        </Box>

    );
};

export default HeaderContainer;

// const def = (<HStack spacing={1} bg='rgb(250,250,250)' justify={'flex-end'} p={1} pr={'20px'} boxShadow={'0px 1px 3px 0px rgba(0, 0, 0, 0.25)'} position='fixed' w='full' zIndex={1212} as='header'>
//     <Box ><Heading fontSize={'md'}>IntroduceMe App</Heading></Box>
//     <Box>
//         <ToolTip label={'preview document'} isDisabled={modalOpen}>
//             <Button variant={'solid'} colorScheme='teal' size={'xs'} leftIcon={<MdPreview />}
//                 onClick={clickPreviewHandler}
//             >
//                 Preview
//             </Button>
//         </ToolTip>
//     </Box>
//     <Box>

//         <ToolTip label='save changes' >
//             <Button
//                 variant={'outline'}
//                 colorScheme='teal'
//                 size={'xs'}
//                 leftIcon={<MdSave />}
//                 isDisabled={!isModified.status}
//                 onClick={clickSaveHandler}
//                 className={isModified.status && 'btnPulse'}

//             >Save</Button>
//         </ToolTip>

//     </Box>
//     <AvatarCustom name={(name.firstName.value !== '' || name.lastName.value !== '') ? `${name.firstName.value} ${name.lastName.value}` : ''} onClickHandler={logoutUser} />

// </HStack >)
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


// const AddMoreSections = ({ dispatch }) => {

//     const hobbiesDisable = useSelector(state => state.hobbies.__serv.isSectionVisible);
//     const languagesDisabled = useSelector(state => state.languages.__serv.isSectionVisible);
//     const coursesDisabled = useSelector(state => state.courses.__serv.isSectionVisible);
//     const referencesDisabled = useSelector(state => state.references.__serv.isSectionVisible);

//     const coursesRef = useRef(null);
//     const hobbiesRef = useRef(null);
//     const languagesRef = useRef(null);
//     const referencesRef = useRef(null);

//     const onClickBtnHandler = (elem) => {
//         switch (elem) {
//             case 'Courses':
//                 dispatch(coursesVisibleToggler())
//                 break;
//             case 'Hobbies':
//                 dispatch(hobbiesVisibleToggler());
//                 break;
//             case 'Languages':
//                 dispatch(languagesVisibleToggler());
//                 break;
//             case 'References':
//                 dispatch(referencesVisibleToggler())
//                 break;
//             default:
//                 break;
//         }
//     }

//     return (
//         <>
//             <Heading as={'h5'} size={'xs'} mb={2}>Add more sections</Heading>
//             <Wrap px={2}>
//                 <WrapItem>
//                     <Button ref={coursesRef} isDisabled={coursesDisabled} size={'sm'} colorScheme={'teal'} variant={'outline'} onClick={() => onClickBtnHandler(coursesRef.current.innerText)} value={'Courses'} leftIcon={<IoSchool />}
//                     >Courses</Button>
//                 </WrapItem>
//                 <WrapItem>
//                     <Button ref={hobbiesRef} isDisabled={hobbiesDisable} size={'sm'} colorScheme={'teal'} variant={'outline'} leftIcon={<IoColorPalette />} onClick={() => onClickBtnHandler(hobbiesRef.current.innerText)} >Hobbies</Button>
//                 </WrapItem>
//                 <WrapItem><Button ref={languagesRef} isDisabled={languagesDisabled} size={'sm'} colorScheme={'teal'} variant={'outline'} leftIcon={<IoLanguage />} onClick={() => onClickBtnHandler(languagesRef.current.innerText)}>Languages</Button></WrapItem>
//                 <WrapItem><Button ref={referencesRef} isDisabled={referencesDisabled} size={'sm'} colorScheme={'teal'} variant={'outline'} leftIcon={<IoPeople />} onClick={() => onClickBtnHandler(referencesRef.current.innerText)}>References</Button></WrapItem>
//             </Wrap>
//         </>
//     )
// }
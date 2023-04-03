
import { Box, VStack, Portal, Container } from '@chakra-ui/react';
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import FooterContainer from '../Footer/FooterContainer';
import HeaderContainer from '../Header/HeaderContainer';
import ModalAnimated from '../ModalAnimated/ModalAnimated';
import { useDispatch, useSelector } from 'react-redux';
import { modalIsOpenToggle } from '../../redux/features/utility/utilitySlice';
import CircularProgressCentered from '../Progress/CircularProgressCentered';



const LayoutDashboard = ({ loggedUser, children }) => {
    const isModalOpen = useSelector(state => state.utility.modalWindow.isOpen);

    const dispatch = useDispatch();
    const modalToggler = () => {
        dispatch(modalIsOpenToggle())
    }

    return (

        <>
            <VStack minH={'100vh'} justifyContent={'space-between'} spacing={0} >

                <Box bg='' w={'full'}>
                    <HeaderContainer loggedUser={loggedUser} />
                </Box>

                <Box w={'full'} pt={'55px'} bg='transparent'>
                    <Container as='main' bg={'white'}
                        border={['', '1px']}
                        borderColor={['', 'gray.200']}
                        borderRadius={10}
                        maxW={'2xl'}
                        p={0} my={0}
                        mx={'auto'}
                    >
                        {children ? children : <CircularProgressCentered />}
                    </Container>
                </Box>
                <Box w={'full'} py={1} >
                    <FooterContainer />
                </Box>
            </VStack>

            <Portal>

                <AnimatePresence mode={'wait'}>
                    {isModalOpen && <ModalAnimated handleClose={modalToggler} key="modal" />}
                </AnimatePresence>

            </Portal>
        </>
    );
};

export default LayoutDashboard;
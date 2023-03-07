import React from 'react';
import { Container, Portal, VStack, Box } from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import SpinnerCustom from '../components/Spinner/SpinnerCustom';
import HeaderContainer from '../Sections/HeaderContainer';
import FormEditPage from './FormEditPage';
import ModalAnimated from '../components/ModalAnimated/ModalAnimated';
import { AnimatePresence } from 'framer-motion';
import { modalIsOpenToggle } from '../redux/features/utility/utilitySlice';
import FooterContainer from '../components/Footer/FooterContainer';

const Dashboard = () => {

    const loggedUser = useSelector(state => state.utility.auth.data);
    const isModalOpen = useSelector(state => state.utility.modalWindow.isOpen);

    const dispatch = useDispatch();
    const modalToggler = () => {
        dispatch(modalIsOpenToggle())
    }

    return (
        <>
            {
                loggedUser
                    ? <>
                        <VStack minH={'100vh'} justifyContent={'space-between'} spacing={0} >
                            <Box bg='orange' w={'full'}>
                                <HeaderContainer user={loggedUser} />
                            </Box>
                            <Box w={'full'} pt={'55px'}>
                                <Container as='main' bg={'white'}
                                    border={['none', '1px']}
                                    borderColor={['', 'gray.200']}
                                    borderRadius={10}
                                    maxW={'2xl'}
                                    p={0} my={0}
                                >
                                    <FormEditPage user={loggedUser} />
                                </Container>
                            </Box>
                            <Box w={'full'} py={1} >
                                <FooterContainer />
                            </Box>
                        </VStack>
                        <Portal>
                            <AnimatePresence exitBeforeEnter={true} >
                                {
                                    isModalOpen && <ModalAnimated handleClose={modalToggler} />
                                }
                            </AnimatePresence>
                        </Portal>


                    </>
                    : <SpinnerCustom />
            }
        </>
    );
};

export default Dashboard;
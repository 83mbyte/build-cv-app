import React from 'react';
import { Container } from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import SpinnerCustom from '../components/Spinner/SpinnerCustom';
import HeaderContainer from '../Sections/HeaderContainer';
import FormEditPage from './FormEditPage';
import ModalAnimated from '../components/ModalAnimated/ModalAnimated';
import { AnimatePresence } from 'framer-motion';
import { modalIsOpenToggle } from '../redux/features/utility/utilitySlice';

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
                        <HeaderContainer user={loggedUser} />

                        <Container as='main' bg={'white'} maxW={'2xl'} p={0}  >
                            <FormEditPage user={loggedUser} />

                        </Container>


                        <AnimatePresence exitBeforeEnter={true} >
                            {
                                isModalOpen && <ModalAnimated handleClose={modalToggler} />
                            }
                        </AnimatePresence>

                    </>
                    : <SpinnerCustom />
            }
        </>
    );
};

export default Dashboard;
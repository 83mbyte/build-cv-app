import React from 'react';
import { Container } from '@chakra-ui/react';

import { useSelector } from 'react-redux';
import SpinnerCustom from '../components/Spinner/SpinnerCustom';
import HeaderContainer from '../Sections/HeaderContainer';
import FormEditPage from './FormEditPage';

const Dashboard = () => {
    const loggedUser = useSelector(state => state.utility.auth.data);

    return (
        <>
            {
                loggedUser
                    ? <>
                        <HeaderContainer user={'user_hero'} />
                        {/* <HeaderContainer user={'loggedUser.userId'} /> */}
                        <Container as='main' bg={'white'} maxW={'3xl'} p={0}  >
                            <FormEditPage />
                        </Container>
                    </>
                    : <SpinnerCustom />
            }
        </>
    );
};

export default Dashboard;

import { Box, VStack, Container } from '@chakra-ui/react';
import React from 'react';
import FooterContainer from '../Footer/FooterContainer';
import HeaderContainer from '../Header/HeaderContainer';
import CircularProgressCentered from '../Progress/CircularProgressCentered';

const LayoutDashboard = ({ loggedUser, children }) => {

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


        </>
    );
};

export default LayoutDashboard;
import React from 'react';
import { Box, VStack, } from '@chakra-ui/react';

import { Outlet } from 'react-router-dom';
import FooterContainer from '../Footer/FooterContainer';
const Layout = () => {
    return (
        <VStack h="100vh" minH={'300px'} justifyContent={'space-around'}  >

            <Box flex={1} alignItems="center" justifyContent={'center'} display={'flex'} w={'full'} >
                {<Outlet />}
            </Box>
            <Box w={'full'} bg='transparent'>
                <FooterContainer />
            </Box>
        </VStack>
    );
};

export default Layout;
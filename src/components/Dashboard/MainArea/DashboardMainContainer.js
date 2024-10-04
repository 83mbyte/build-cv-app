'use client'

import { Box, Container, Spinner, } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import PersonalDetailsContainer from './PersonalDetails/PersonalDetailsContainer';
import AnimationWrapper from '@/components/Animation/AnimationWrapper';

const DashboardMainContainer = () => {

    const userLogged = useSelector(state => state.auth.auth.data);

    return (
        <WhiteAreaWrapperAnimated>
            {
                !userLogged?.userId
                    ? <Box p={2} w='full' display={'flex'} bg={'transparent'} justifyContent={'center'} h='100%' alignItems={'center'}>
                        <Spinner color='teal' size='xl' />
                    </Box>
                    : <Box>
                        <PersonalDetailsContainer />
                    </Box>
            }
        </WhiteAreaWrapperAnimated>
    );
};

export default DashboardMainContainer;


const WhiteAreaWrapperAnimated = ({ children }) => {

    return (
        <Box w={'full'} pt={'55px'} bg='transparent' height={'100%'} >

            <AnimationWrapper variant='opacity'>
                <Container bg={'white'}
                    border={['', '1px']}
                    borderColor={['', 'gray.200']}
                    borderRadius={10}
                    maxW={'2xl'}
                    p={0} my={0}
                    mx={'auto'}
                    minH={'50vh'}
                    height={'100%'}
                >
                    {children}
                </Container>
            </AnimationWrapper>
        </Box>
    )
}
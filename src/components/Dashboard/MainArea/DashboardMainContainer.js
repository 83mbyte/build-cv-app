'use client'

import { Box, Container, Spinner, } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import AnimationWrapper from '@/components/Animation/AnimationWrapper';

import PersonalDetailsContainer from './PersonalDetails/PersonalDetailsContainer';
import Summary from './Summary/Summary';
import Education from './Education/Education';
import Skills from './Skills/Skills';
import History from './History/History';

const DashboardMainContainer = () => {

    const userLogged = useSelector(state => state.auth.auth.data);

    return (
        <WhiteAreaWrapperAnimated>
            {
                !userLogged?.userId
                    ? <Box p={2} w='full' display={'flex'} bg={'transparent'} justifyContent={'center'} h='100%' alignItems={'center'}>
                        <Spinner color='teal' size='xl' />
                    </Box>
                    : <Box display={'flex'} flexDirection={'column'}>
                        <PersonalDetailsContainer userLogged={userLogged} />
                        <Education userLogged={userLogged} />
                        <Skills userLogged={userLogged} />
                        <Summary userLogged={userLogged} />
                        <History userLogged={userLogged} />


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
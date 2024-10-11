'use client'

import { useEffect, lazy, Suspense, Fragment } from 'react';
import { Box, Container, Spinner, } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdditionalSections } from '@/redux/features/utility/utilitySlice';

import AnimationWrapper from '@/components/Animation/AnimationWrapper';
import PersonalDetailsContainer from './PersonalDetails/PersonalDetailsContainer';
import Summary from './Summary/Summary';
import Education from './Education/Education';
import Skills from './Skills/Skills';
import History from './History/History';
import Links from './Links/Links';

const Courses = lazy(() => import('./Courses/Courses'));
const Languages = lazy(() => import('./Languages/Languages'));
const References = lazy(() => import('./References/References'));


const DashboardMainContainer = () => {
    const dispatch = useDispatch();
    const userLogged = useSelector(state => state.auth.auth.data);
    const additionalSections = useSelector(state => state.utility.additionalSections);

    const sectionsToShow = {
        // hobbies: <Hobbies userLogged={userLogged} key={'section_hobbies'} />,
        courses: <Courses userLogged={userLogged} key={'section_courses'} />,
        references: <References userLogged={userLogged} key={'section_references'} />,
        languages: <Languages userLogged={userLogged} key={'section_languages'} />
    }

    useEffect(() => {
        if (additionalSections.status === 'idle' && userLogged) {
            dispatch(getAdditionalSections(userLogged));
        }
    }, [additionalSections.status, userLogged, dispatch]);

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
                        <Links userLogged={userLogged} />


                        {/* additional sections */}
                        {
                            additionalSections.data
                            && additionalSections.data.map((item, index) => {

                                return (
                                    // Additional sections  
                                    <Fragment key={index}>
                                        <Suspense >
                                            {sectionsToShow[item]}
                                        </Suspense>
                                    </Fragment>
                                )
                            })
                        }

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
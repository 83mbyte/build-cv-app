'use client'
import {
    Box, Button,
    CloseButton,
    Drawer,
    HStack,
    Portal,
    Stack,
    Text,
    StackSeparator,

} from '@chakra-ui/react';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';


import { LuChevronsRight, LuMessageCircle, LuUsers } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/__firebase/__firebaseConf';
import { setAuthUserData } from '@/redux/auth/authSlice';
import FallbackSpinner from '../editor_page/FallbackSpinner';
import MotionUsersBlock from './UsersBlock';
import MotionContactBlock from './ContactBlock';

const showWindowsAnimation = {
    hidden: {
        scale: 0.9,
        opacity: 0,
    },
    show: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.5
        }
    },
    exit: {
        scale: 0.9,
        opacity: 0,
    }
}

const auth = getAuth(app);

const ControlCenterContainer = () => {
    // check auth state
    const [isLoadingUserData, setIsLoadingUserData] = useState(true);
    // show content block state
    const [showBlock, setShowBlock] = useState(
        {
            users: null,
            contact: null
        }
    );
    //  user state
    const [usersArray, setUsersArray] = useState(null);

    // contact form state
    const [contactAllData, setContactAllData] = useState(null);

    // userLogged data
    const userLogged = useSelector((state) => state.auth.data);
    const dispatch = useDispatch();



    useEffect(() => {
        // manage userLogged state
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && user.uid && user.accessToken) {
                auth.currentUser.getIdTokenResult(user.accessToken).then((idTokenResult) => {
                    dispatch(setAuthUserData({ userId: user.uid, accessToken: user.accessToken, email: user.email, role: idTokenResult?.claims.admin ? 'admin' : 'user', fullName: user.displayName, subscription: {} }));
                });
            } else {
                dispatch(setAuthUserData(null));
            }

            setIsLoadingUserData(false);
        });

        return () => unsubscribe();
    }, []);

    return (


        <>
            {
                (isLoadingUserData || !userLogged || userLogged.role !== 'admin')
                    ? <Box h='99vh' bg='' display={'flex'}><FallbackSpinner /></Box>

                    : <motion.div initial={{ y: 1000 }} animate={{ y: 0, }} transition={{ type: 'tween' }}>
                        <Box zIndex={1000} bg='' position={'fixed'} w='full' h='auto'>
                            <DrawerComponent placement={'start'} setShowBlock={setShowBlock} />
                        </Box>
                        <Box bg='' minHeight={'100%'} w={'full'} display={'flex'} alignItems={'center'} flexDir={'column'}>
                            <Box
                                border={'1px dashed white'}
                                padding={3}
                                paddingLeft={{ base: '10', md: '3' }}
                                w={['full', '2xl', '3xl', '4xl']}
                                display={'flex'}
                                bg='white'
                                minHeight={'100vh'}
                            >

                                <motion.div style={{ width: '100%', rowGap: '10px', display: 'flex', flexDirection: 'column' }} layout='position'>

                                    <AnimatePresence>
                                        {
                                            (showBlock.users == true) &&
                                            <MotionUsersBlock variants={showWindowsAnimation} initial='hidden' animate='show' exit='exit' usersArray={usersArray} setUsersArray={setUsersArray} key={'usersBlock'} layout />
                                        }
                                        {
                                            showBlock.contact == true &&
                                            <MotionContactBlock variants={showWindowsAnimation} initial='hidden' animate='show' exit='exit' key={'contactBlock'} contactAllData={contactAllData} setContactAllData={setContactAllData} layout />
                                        }
                                    </AnimatePresence>

                                </motion.div>

                            </Box>
                        </Box>
                    </motion.div >
            }
        </>
    );
};

export default ControlCenterContainer;



const DrawerComponent = ({ placement = 'bottom', setShowBlock }) => {
    const userLogged = useSelector((state) => state.auth.data);
    return (
        <Drawer.Root key={placement} placement={placement} preventScroll={false} size='xs'>
            <HStack marginY={1} marginX={2}>
                <motion.div initial={{ x: 0 }} animate={{ x: -99, transition: { delay: 0.4, type: 'tween' } }} whileHover={{ x: 0, }}
                    whileTap={{ x: 0, }}
                    transition={{ type: 'tween' }}>
                    <Drawer.Trigger asChild>
                        <Button size="sm" colorPalette='teal' variant='solid'>
                            Show Menu
                            <LuChevronsRight />
                        </Button>
                    </Drawer.Trigger>
                </motion.div>
                <div style={{ display: 'flex', flex: 1 }}></div>
            </HStack>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner >
                    <Drawer.Content
                        margin={2}
                        marginTop={'12'}
                        rounded={'l3'}
                    >
                        <Drawer.Header>
                            <Drawer.Title>Control Center Menu
                                {userLogged && <Text fontSize={'sm'} fontWeight={'normal'}> {userLogged.email} - {userLogged.role}</Text>}
                            </Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body alignItems={'center'} display={'flex'} flexDirection={'column'} bg=''>

                            {
                                userLogged && <NavigationContainer setShowBlock={setShowBlock} />
                            }

                        </Drawer.Body>
                        {/* <Drawer.Footer>
                                <Drawer.ActionTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
                                </Drawer.ActionTrigger>
                                <Button>Save</Button>
                            </Drawer.Footer> */}
                        <Drawer.CloseTrigger asChild>
                            <CloseButton size="sm" colorPalette={'teal'} />
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    )
}

const NavigationContainer = ({ setShowBlock }) => {

    const navButtons = [
        {
            title: 'Users',
            icon: <LuUsers />,
            actionCallback: () => setShowBlock(prev => {
                return { ...prev, users: !prev.users }
            })
        },
        {
            title: 'ContactForm Messages',
            icon: <LuMessageCircle />,
            actionCallback: () => setShowBlock(prev => {
                return { ...prev, contact: !prev.contact }
            })
        },

    ]
    return (


        <Stack flexDirection={['column']} gap={[3, 6]} wrap={'wrap'} separator={<StackSeparator />} w='full' bg=''  >
            {
                navButtons.map((item, index) => {
                    return (
                        <Button colorPalette={'teal'} size={'xs'} key={index} onClick={() => item.actionCallback()}>
                            {item.icon}
                            {item.title}</Button>
                    )
                })
            }
        </Stack >
    )
}

'use client'
import { getDataFromFunctionsEndpoint } from '@/lib/commonScripts';
import {
    Box, Button,
    Card,
    CloseButton,
    Drawer,
    HStack,
    Portal,
    Stack,
    Text,
    Table,
    Pagination,
    IconButton,
    ButtonGroup,
    VStack,
} from '@chakra-ui/react';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';


import { LuChevronsRight, LuArrowDown01, LuArrowDown10, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Tooltip } from '../ui/tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/__firebase/__firebaseConf';
import { setAuthUserData } from '@/redux/auth/authSlice';
import FallbackSpinner from '../editor_page/FallbackSpinner';

const showWindowsAnimation = {
    hidden: {
        scale: 0.9,
        opacity: 0,
    },
    show: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 1
        }
    },
    exit: {
        scale: 0.9,
        opacity: 0
    }
}

const auth = getAuth(app);

const ControlCenterContainer = () => {
    const [isLoadingUserData, setIsLoadingUserData] = useState(true);
    const [show, setShow] = useState({ type: null, status: false });
    const [usersArray, setUsersArray] = useState([]);
    const [sortAsc, setSortAsc] = useState(true);
    const userLogged = useSelector((state) => state.auth.data);

    const dispatch = useDispatch();

    const getUsers = async () => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ variant: 'getUsersList' }),
        };


        const respond = await getDataFromFunctionsEndpoint('controlCenterActions', options);

        if (respond) {
            let res = await respond.json();
            if (!res || res.status !== 'Success') {
                console.log('error while getting users list')
                //  TODO put something like alert
                //  TODO put something like alert
                //  TODO put something like alert 
            } else if (res && res.status == 'Success') {
                const modifiedArray = res.data.map(item => {
                    return { ...item, creationTime: Date.parse(item.creationTime) }
                });

                setUsersArray(modifiedArray)
            }
        } else {
            console.log('no response from server')
        }

    }

    const sortByDate = () => {

        const sortArray = usersArray;
        sortArray.sort((a, b) => {
            if (sortAsc === true) {
                return (a.creationTime - b.creationTime)
            }
            else {
                return (b.creationTime - a.creationTime)
            }
        });

        setUsersArray(sortArray);
        setSortAsc(prev => !prev)
    }

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
        <Box bg='' position={'relative'} minHeight={'100vh'} padding={0}>
            {
                (isLoadingUserData || !userLogged || userLogged.role !== 'admin')
                    ? <Box h='99vh' bg='' display={'flex'}><FallbackSpinner /></Box>
                    : <>
                        <Box zIndex={1000} position={'fixed'}>
                            <DrawerComponent placement={'bottom'} setShow={setShow} />
                        </Box>
                        <Box position={'relative'} top={11} bg='' justifyContent={'center'} display={'flex'}>
                            <VStack bg='' w='full' maxWidth={'5xl'} marginInline={['2', '4']}>
                                <AnimatePresence mode='wait'>
                                    {
                                        (show.type == 'one' && show.status == true) &&
                                        <motion.div variants={showWindowsAnimation} initial='hidden' animate='show' exit='exit' key={'window_1'} style={{ width: '100%' }}>

                                            <CardContainer>

                                                {
                                                    (usersArray && usersArray.length > 0) &&
                                                    <TableUsers usersArray={usersArray} sortAsc={sortAsc} sortByDate={sortByDate} />
                                                }

                                                <Box>
                                                    <Button size={'sm'} colorPalette={'teal'} onClick={getUsers}>get users</Button>
                                                </Box>
                                            </CardContainer>

                                        </motion.div>
                                    }
                                    {
                                        (show.type == 'two' && show.status == true) &&
                                        <motion.div>
                                            2
                                        </motion.div>
                                    }
                                    {
                                        (show.type == 'tree' && show.status == true) &&
                                        <Box>3</Box>
                                    }
                                </AnimatePresence>

                            </VStack>
                        </Box>
                    </>
            }

        </Box >
    );
};

export default ControlCenterContainer;

const CardContainer = ({ children }) => {
    return (
        <Card.Root w={'full'} my={0} p={3} mx={0}>
            <Card.Body p={[1, 6]}>
                <VStack bg=''>
                    {children}
                </VStack>
            </Card.Body>
        </Card.Root>
    )
}

const TableUsers = ({ sortAsc, usersArray, sortByDate }) => {

    return (
        <>
            <Table.Root key={'xs'} size={'md'} showColumnBorder variant={'outline'} w='full' maxW={'lg'}>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>Email</Table.ColumnHeader>

                        <Table.ColumnHeader textAlign="end">
                            <Tooltip showArrow content="Click to sort by date" openDelay={300} positioning={{ placement: 'bottom' }} >
                                <Button variant={'ghost'} onClick={sortByDate} size='sm'>Registered on:
                                    {
                                        sortAsc == true
                                            ? <LuArrowDown10 />
                                            : <LuArrowDown01 />
                                    }
                                </Button>
                            </Tooltip>
                        </Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        usersArray.map((user, index) => {

                            return (
                                <Table.Row key={index} >
                                    <Table.Cell>{user.email}</Table.Cell>
                                    <Table.Cell textAlign="end">
                                        {new Date(user.creationTime).toLocaleDateString()}

                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                </Table.Body>
            </Table.Root>
            <Pagination.Root count={usersArray.length} pageSize={10} page={1}>
                <ButtonGroup variant="ghost" size="sm" wrap="wrap">
                    <Pagination.PrevTrigger asChild>
                        <IconButton>
                            <LuChevronLeft />
                        </IconButton>
                    </Pagination.PrevTrigger>

                    <Pagination.Items
                        render={(page) => (
                            <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                                {page.value}
                            </IconButton>
                        )}
                    />

                    <Pagination.NextTrigger asChild>
                        <IconButton>
                            <LuChevronRight />
                        </IconButton>
                    </Pagination.NextTrigger>
                </ButtonGroup>
            </Pagination.Root>
        </>
    )
}

const DrawerComponent = ({ placement = 'bottom', setShow }) => {
    const userLogged = useSelector((state) => state.auth.data);
    return (
        <Drawer.Root key={placement} placement={placement} >
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
                        rounded={'l3'}
                    >
                        <Drawer.Header>
                            <Drawer.Title>Control Center Menu
                                {userLogged && <Text fontSize={'sm'} fontWeight={'normal'}> {userLogged.email} - {userLogged.role}</Text>}
                            </Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body justifyContent={'center'} display={'flex'} >

                            {
                                userLogged && <NavigationContainer setShow={setShow} />
                            }

                        </Drawer.Body>
                        {/* <Drawer.Footer>
                                <Drawer.ActionTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
                                </Drawer.ActionTrigger>
                                <Button>Save</Button>
                            </Drawer.Footer> */}
                        <Drawer.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    )
}

const NavigationContainer = ({ setShow }) => {

    const navButtons = [
        {
            title: 'Users',
            actionCallback: () => setShow(prev => {
                return { type: 'one', status: !prev.status }
            })
        },
        {
            title: 'Nav #2 ',
            actionCallback: () => setShow(prev => {
                return {
                    type: 'two', status: !prev.status
                }
            })
        },

    ]
    return (


        <Stack flexDirection={['column', 'row']} gap={[3, 6]} wrap={'wrap'}>
            {
                navButtons.map((item, index) => {
                    return (
                        <Button colorPalette={'teal'} size={'xs'} key={index} onClick={() => item.actionCallback()}>{item.title}</Button>
                    )
                })
            }
        </Stack>
    )
}


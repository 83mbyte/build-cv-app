import { getDataFromFunctionsEndpoint } from '@/lib/commonScripts';
import {
    Box, Button,
    Stack,
    Table,
    Pagination,
    IconButton,
    ButtonGroup,
    Heading,
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

import { Tooltip } from '../ui/tooltip';
import { toaster } from '../ui/toaster';

import { LuArrowDown01, LuArrowDown10, LuChevronLeft, LuChevronRight, LuRefreshCw } from "react-icons/lu";
import CardWrapper from './CardWrapper';

const UsersBlock = ({ ref, usersArray, setUsersArray }) => {
    const [showTable, setShowTable] = useState(false);
    const [sortAsc, setSortAsc] = useState(true);
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
        setSortAsc(prev => !prev);
    }

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
            if (!res || !res.status == 'Success') {
                console.log('error while getting users list')
                toaster.create({
                    type: 'alert',
                    description: 'error while getting users list',
                    duration: 3000
                });
            } else if (res && res.status == 'Success') {
                const modifiedArray = res.data.map(item => {
                    return { ...item, creationTime: Date.parse(item.creationTime) }
                });

                setUsersArray(modifiedArray)
            }
        } else {
            console.log('no response from server')
            setUsersArray([])
        }
    }

    useEffect(() => {
        if (!usersArray) {
            getUsers();
        }
    }, [])

    return (

        <CardWrapper ref={ref} >
            {
                (usersArray && usersArray.length > 0) &&
                <Stack flexDirection={['column', 'row']} w='full'>
                    <Stack flexDirection={['row', 'column']}   >
                        <Box bg=''>
                            <Box bg='gray.100' w={'150px'} height={'150px'} display={'flex'} justifyContent={'center'} alignItems={'center'} rounded={'l3'}>
                                <Heading>Total Users: {usersArray.length}</Heading>

                            </Box>
                        </Box>
                        <Box bg='' display={'flex'} justifyContent={'center'} alignItems={'center'} w='full'>
                            <Tooltip showArrow content="Refresh Users" openDelay={300} positioning={{ placement: 'bottom' }} >
                                <IconButton colorPalette={'teal'} onClick={getUsers} variant={'solid'}>
                                    <LuRefreshCw />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Stack>

                    {
                        showTable == false
                            ? <Button variant={'ghost'} size='sm' colorPalette={'teal'} onClick={() => setShowTable(true)}>show users</Button>

                            : <Box bg='' display={'flex'} flexDirection={'column'} w='full'>
                                <TableUsers usersArray={usersArray} sortAsc={sortAsc} sortByDate={sortByDate} />
                            </Box>
                    }
                </Stack>
            }
        </CardWrapper >
    )
};

const TableUsers = ({ sortAsc, usersArray, sortByDate }) => {

    return (
        <>
            <Table.Root key={'xs'} size={['sm', 'md']} bg={''} showColumnBorder variant={'outline'} w='full' maxW={'full'}>
                <Table.Header>
                    <Table.Row >
                        <Table.ColumnHeader>Email</Table.ColumnHeader>

                        <Table.ColumnHeader justifyContent="end" display={['none', 'flex']}>
                            <Tooltip showArrow content="Click to sort by date" openDelay={300} positioning={{ placement: 'bottom' }} >
                                <Button variant={'ghost'} onClick={sortByDate} size='sm'>Registered on
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
                                    <Table.Cell w='full'>{user.email}</Table.Cell>
                                    <Table.Cell justifyContent="end" display={['none', 'flex']}>
                                        {new Date(user.creationTime).toLocaleDateString()}

                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                </Table.Body>
            </Table.Root>
            <Pagination.Root my={3} count={usersArray.length} pageSize={10} page={1} justifyContent={'center'} display={'flex'}>
                <ButtonGroup variant="ghost" size="sm" wrap="wrap">
                    <Pagination.PrevTrigger asChild>
                        <IconButton size={'xs'}>
                            <LuChevronLeft />
                        </IconButton>
                    </Pagination.PrevTrigger>

                    <Pagination.Items
                        render={(page) => (
                            <IconButton variant={{ base: "ghost", _selected: "outline" }} size={'xs'}>
                                {page.value}
                            </IconButton>
                        )}
                    />
                    <Pagination.NextTrigger asChild>
                        <IconButton size={'xs'}>
                            <LuChevronRight />
                        </IconButton>
                    </Pagination.NextTrigger>
                </ButtonGroup>
            </Pagination.Root>
        </>
    )
}


const MotionUsersBlock = motion.create(UsersBlock);

export default MotionUsersBlock;
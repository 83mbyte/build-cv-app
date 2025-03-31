import { Box, Stack, Button } from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link';


const ToolkitHeader = () => {
    return (
        <Stack flexDirection={['row']} justifyContent={'space-between'} w='full' bg='' alignItems={'center'} as='header'>
            <Box>
                <Link href='/'>
                    <Button fontSize={'lg'} colorPalette={'teal'} size={['xs', 'sm']} variant={'plain'}>{process.env.NEXT_PUBLIC_APP_NAME_FULL}</Button>
                </Link>
            </Box>
            <Box>
                <Link href='/editor'>
                    <Button colorPalette={'teal'} size={['xs', 'sm']}>Create Resume</Button>
                </Link>
            </Box>
        </Stack>
    );
};

export default ToolkitHeader;
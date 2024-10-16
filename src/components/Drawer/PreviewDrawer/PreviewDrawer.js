
import {
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    Box,
    HStack, Center
} from '@chakra-ui/react'

import { BackIcon } from '@/components/Icons/Icon';
import ToolTip from '@/components/ToolTip/ToolTip';
import React from 'react';


const PreviewDrawer = ({ onCloseHandler }) => {

    return (
        // render in the drawer container
        <>
            <DrawerHeader borderBottomWidth='1px' py={[2, 4]}>
                {/* <HStack alignItems={'center'}>
                        <Box flex={1} alignItems={'center'}>Resume Preview</Box>
                        <Box bg='' onClick={onCloseHandler} >
                            <CloseIcon />
                        </Box>
                    </HStack> */}
                <HStack  >
                    <Box bg='' onClick={() => onCloseHandler()} >
                        <ToolTip label='back to dashboard'>
                            <BackIcon />
                        </ToolTip>
                    </Box>
                    <Box w='full' >
                        <Center>Resume Preview</Center>
                    </Box>
                </HStack>
            </DrawerHeader>
            <DrawerBody p={0} bg='gray.50'>
                <Box display={'flex'} flexDirection={['column', 'row']} bg='' h={'full'}>
                    <Box display={'flex'} flexDirection={['row', 'column']} bg='' h={['35%', 'full']} w={['full', '20%']} borderRight={['none', '2px solid gray']} my={1} >
                        <Box overflowY={'scroll'} bg='white'>
                            {/* <TemplateSelection /> */}
                        </Box>
                    </Box>
                    <Box display={'flex'} flexDirection={'column'} bg='gray.50' h={'100%'} w={['full']} >
                        <Box my={1} h={'100%'} overflowY={'scroll'} bg='white'>
                            {/* <TemplateDocumentView /> */}
                        </Box>
                    </Box>
                </Box>
            </DrawerBody>
            <DrawerFooter bg='' py={'1'}  >

            </DrawerFooter>
        </>
    );
};

export default PreviewDrawer;

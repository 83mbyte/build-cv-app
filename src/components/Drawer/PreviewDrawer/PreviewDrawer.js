
import {
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    Box,
    HStack, Center, Heading
} from '@chakra-ui/react';


import { BackIcon } from '@/components/Icons/Icon';
import ToolTip from '@/components/ToolTip/ToolTip';
import TemplateSelection from '../../ResumeTemplates/TemplateSelection';
import TemplateDocumentView from '@/components/ResumeTemplates/TemplateDocumentView';
import FooterString from '@/components/Footer/FooterString';


const PreviewDrawer = ({ onCloseHandler }) => {

    return (
        // render in the drawer container
        <>
            <DrawerHeader borderBottomWidth='1px' py={[1, 2]}>
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
                        <Center><Heading size={['xs', 'md']} as='h2'> Resume Preview</Heading></Center>
                    </Box>
                </HStack>
            </DrawerHeader>
            <DrawerBody p={0} bg='gray.200'>

                <Box display={'flex'} flexDirection={['column', 'row']} bg='' h={'full'}>
                    <Box display={'flex'} flexDirection={['row', 'column']} bg='' h={['31%', 'full']} w={['full', '20%']} borderRight={['none', '1px solid grey']} py={[1, 5]} px={[2, 0]} borderBottom={['1px solid grey', 'none']}>
                        <Box overflow={'scroll'} bg='transparent' >
                            <TemplateSelection />
                        </Box>
                    </Box>
                    <Box display={'flex'} flexDirection={'column'} bg='gray.50' h={'100%'} w={['full']} >
                        <Box my={1} h={'100%'} overflowY={'scroll'} bg='white'>
                            <TemplateDocumentView />
                        </Box>
                    </Box>
                </Box>
            </DrawerBody>
            <DrawerFooter bg='gray.200' justifyContent={'center'} py={0.5}><FooterString /></DrawerFooter>
        </>
    );
};

export default PreviewDrawer;

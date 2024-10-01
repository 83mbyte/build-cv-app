import { Box, Flex, Container, HStack } from '@chakra-ui/react';

const DashboardHeaderContainer = () => {
    return (
        <Flex position="fixed" backgroundColor="white" bg='rgb(250,250,250)' p={1} boxShadow={'0px 1px 3px 0px rgba(0, 0, 0, 0.25)'} w='full' zIndex={1212} as='header'>

            <Container maxW={'3xl'} py={1} px={['10px', '10px', '20px']} bg={'transparent'}>
                <HStack justify={'space-between'} align='center'>
                    <Box>Logo_Here</Box>
                    <HStack spacing={2} p={0}>
                        <Box>SomeBtn</Box>
                        <Box>MenuBtn</Box>
                    </HStack>
                </HStack>
            </Container>
        </Flex>
    );
};

export default DashboardHeaderContainer;
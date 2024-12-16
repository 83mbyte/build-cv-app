const { Box, VStack, HStack, Divider, Text, } = require("@chakra-ui/react")


const AlternativeSignInForm = ({ children }) => {
    return (
        <Box p={2} w='full'>
            <VStack spacing={[3, 5]} >
                <HStack w={'full'} justifyContent={'space-between'}>
                    <Divider w={'full'} />
                    <Text backgroundColor={''} textAlign={'center'} px={1} w={10} fontSize={'xs'}>else</Text>
                    <Divider w={'full'} />
                </HStack>
                <Box w='full' bg=''>
                    {children}
                </Box>
            </VStack >
        </Box >
    )
}

export default AlternativeSignInForm;
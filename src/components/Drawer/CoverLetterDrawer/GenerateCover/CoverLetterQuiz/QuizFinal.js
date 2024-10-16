import { VStack, Box, Heading, Text, Divider } from '@chakra-ui/react';
import React from 'react';

const QuizFinal = ({ coverText }) => {
    return (
        <VStack spacing={5} w='full'  >
            {
                (!coverText || coverText === '' || coverText === undefined)
                    ?
                    <Box bg='' w='full' p={5} borderRadius={5} mb={3}>
                        <Heading as={'h2'} bg='transparent' textAlign={'center'} color='red'>Unexpected error</Heading>
                        <Text textAlign={'center'} mb={'10px'} fontSize={'xs'} color={'gray.500'} pt={0}>Please go back and check your details again.</Text>
                    </Box>
                    : <>

                        <Box bg='green.50' w='full' p={[1, 5]} mx={0} mb={3} borderRadius={5}>
                            <Box>
                                <Heading as={'h2'} bg='transparent' textAlign={'center'} color='teal'>Done!</Heading>
                                <Text textAlign={'center'} mb={'10px'} fontSize={'xs'} color={'gray.500'} pt={0}>You cover letter text is ready.</Text>
                            </Box>
                            <Box bg='' my={1} py={1} w='full'>
                                <Divider />
                            </Box>
                            <Box m={5}><Text>{coverText}</Text></Box>
                        </Box>
                    </>
            }

        </VStack>
    );
};

export default QuizFinal;
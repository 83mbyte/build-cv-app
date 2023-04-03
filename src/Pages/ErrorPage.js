import { Box, Heading, Text, VStack, Button } from "@chakra-ui/react";
import { useRouteError, Link as RouterLink } from "react-router-dom";

import WhiteboxCenterAndFooter from "../components/Wrappers/WhiteboxCenterAndFooter";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error.error.message);

    return (
        <WhiteboxCenterAndFooter>

            <VStack spacing={[3, 5]} align='flex-start' w='full'>
                <VStack spacing={1} w='full' align={['flex-start', 'center']}>
                    <Heading as='h2'>Oops!</Heading>
                    <Text>Sorry, an unexpected error has occurred.</Text>
                    {
                        error.status && <Text>Error: <Text as='span'>{error.status}</Text></Text>
                    }
                    {(error.statusText || error.message) &&
                        <Text as="i">
                            {error.error.message}
                        </Text>
                    }
                    <Box>
                        <Button variant={'link'} colorScheme={'teal'} fontSize={'xs'} mx={0} px={0} as={RouterLink} to="/" >Back to Index</Button>
                    </Box>
                </VStack>
            </VStack>

        </WhiteboxCenterAndFooter>

    );
}



import { Box, Container, Text, Stack } from '@chakra-ui/react';
import FooterString from './FooterString';

const FooterContainer = ({ textColor = 'teal' }) => {
    return (
        <Box w="full" pt={2} pb={2} backgroundColor={'transparent'} minHeight={'30px'}>
            <Container
                as={Stack}
                direction={{ base: 'column', md: 'row' }}
                spacing={3}
                px={2}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}
                fontSize={'xs'}
            >
                <Text color={textColor}>{process.env.NEXT_PUBLIC_APP_NAME_FULL}</Text>
                <FooterString color={textColor} />
            </Container>
        </Box >
    );
};

export default FooterContainer;
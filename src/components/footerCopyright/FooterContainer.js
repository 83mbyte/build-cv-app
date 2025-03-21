
import { Box, Text, Stack } from '@chakra-ui/react';
import FooterString from './FooterString';
import Link from 'next/link';

const FooterContainer = ({ textColor = 'teal' }) => {
    return (
        <Box pt={2} pb={2} backgroundColor={'transparent'} minHeight={'30px'} as='footer'>
            <Stack bg='' gap={['1', '3']} direction={['column', 'row']} alignItems={'center'} justifyContent={'center'}>
                <FooterString color={textColor} />
                <Text color={textColor} fontSize={'xs'} >{process.env.NEXT_PUBLIC_APP_NAME_FULL} | <Link href='/contact'>Contact Us</Link>
                </Text>
            </Stack>
        </Box >
    );
};

export default FooterContainer;
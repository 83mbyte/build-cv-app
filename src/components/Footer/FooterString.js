import { Text, Box } from '@chakra-ui/react';

const FooterString = ({ color = 'lightgrey' }) => {
    return (

        <Box><Text fontSize={'xs'} color={color}>&copy; {`${new Date().getFullYear()}. All rights reserved.`}</Text></Box>
    );
};

export default FooterString;
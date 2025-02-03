import { Text, Box } from '@chakra-ui/react';

const FooterString = ({ color = 'lightgrey' }) => {
    return (

        <Box>
            <Text fontSize={'xs'} color={color}>©&nbsp;&nbsp;{new Date().getFullYear()}&nbsp;&nbsp;All rights reserved.</Text>
        </Box>
    );
};

export default FooterString;
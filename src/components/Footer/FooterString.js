import { Text, Box } from '@chakra-ui/react';
import React from 'react';

const FooterString = () => {
    return (

        <Box><Text fontSize={'xs'} color={'lightgrey'}>&copy; {`${new Date().getFullYear()}. All rights reserved.`}</Text></Box>
    );
};

export default FooterString;
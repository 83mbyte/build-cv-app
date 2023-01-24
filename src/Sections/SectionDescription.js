import { Text } from '@chakra-ui/react';
import React from 'react';

const SectionDescription = ({ value }) => {
    return (
        <Text mb='-2' fontSize={'xs'} color={'gray.500'}>{value}</Text>
    );
};

export default SectionDescription;
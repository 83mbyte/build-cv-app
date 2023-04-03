import { Text } from '@chakra-ui/react';
import React from 'react';

const SectionDescription = ({ value }) => {
    return (
        <Text mb={'10px'} fontSize={'xs'} color={'gray.500'} pt={0} mt={'-5px'}> {value}</Text >
    );
};

export default SectionDescription;
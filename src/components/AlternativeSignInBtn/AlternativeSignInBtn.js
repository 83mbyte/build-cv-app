import { Button, Text } from '@chakra-ui/react';
import React from 'react';

const AlternativeSignInBtn = ({ sizeBreakPoints, providerName, icon, onClickFn }) => {
    return (

        <Button
            onClick={onClickFn}
            w={'full'}
            size={sizeBreakPoints} rounded={sizeBreakPoints}
            variant={'outline'}
            colorScheme='teal'
            leftIcon={icon}
            _hover={{ backgroundColor: 'white' }}
        >
            <Text>Sign In with {providerName}</Text>
        </Button>
    );
};

export default AlternativeSignInBtn;
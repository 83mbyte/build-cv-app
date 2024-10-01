import { Button, Text } from '@chakra-ui/react';

const AlternativeSignInBtn = ({ sizeBreakPoints, providerName, icon, isLoading, onClickCallback }) => {
    return (

        <Button
            onClick={onClickCallback}
            w={'full'}
            size={sizeBreakPoints} rounded={sizeBreakPoints}
            variant={'outline'}
            colorScheme='teal'
            leftIcon={icon}
            isLoading={isLoading}
            _hover={{ backgroundColor: 'white' }}
        >
            <Text>Sign In with {providerName}</Text>
        </Button>
    );
};

export default AlternativeSignInBtn;
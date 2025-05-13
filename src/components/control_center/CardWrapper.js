import {
    Card,
    VStack,
} from '@chakra-ui/react';

const CardWrapper = ({ ref, children }) => {
    return (
        <Card.Root w={'full'} my={0} p={3} mx={0} ref={ref} >
            <Card.Body p={[1, 6]}  >
                <VStack  >
                    {children}
                </VStack>
            </Card.Body>
        </Card.Root>
    )
};

export default CardWrapper;
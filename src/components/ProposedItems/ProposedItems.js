import { Box, ButtonGroup, Wrap, Button, WrapItem } from '@chakra-ui/react';

const ProposedItems = ({ predefined, sectionName, onClickCallback }) => {

    return (
        <Box mt={2} mb={5} w={'100%'} px='8px' minW={'200px'}   >
            <ButtonGroup colorScheme={'teal'} variant={'outline'} size={'sm'}  >

                <Wrap spacing={2}  >

                    {
                        predefined && predefined.length > 0 &&
                        predefined.map((item, index) => {
                            return <WrapItem key={`${sectionName}_predef_${index}`}>
                                <Button size={'xs'} onClick={() => onClickCallback(item)}>{`+ ${item.label}`}</Button>
                            </WrapItem>
                        })
                    }
                </Wrap>
            </ButtonGroup>
        </Box >
    );
};

export default ProposedItems;
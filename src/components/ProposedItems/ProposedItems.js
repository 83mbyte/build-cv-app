import { Box, ButtonGroup, Wrap, Button } from '@chakra-ui/react';
import React from 'react';

const ProposedItems = ({ predefined, sectionName, onClickCallback }) => {

    return (
        <Box mt={2} mb={5} w={'100%'} px='8px' minW={'200px'}   >
            <ButtonGroup colorScheme={'teal'} variant={'outline'} size={'sm'}  >

                <Wrap spacing={2}  >

                    {
                        predefined && predefined.length > 0 &&
                        predefined.map((item, index) => {
                            return <Button key={`${sectionName}_predef_${index}`} onClick={() => onClickCallback(item)}>{`+ ${item.label}`}</Button>
                        })
                    }
                </Wrap>
            </ButtonGroup>
        </Box >
    );
};

export default ProposedItems;
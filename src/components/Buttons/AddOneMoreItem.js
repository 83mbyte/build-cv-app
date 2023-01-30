import { Box, Button } from '@chakra-ui/react';
import React from 'react';

const AddOneMoreItem = ({ itemType = '', handleAddNewItemBtn }) => {
    return (
        <Box>
            <Button
                variant={'ghost'}
                colorScheme={'teal'}
                onClick={handleAddNewItemBtn}
            >+ Add more {itemType}
            </Button>
        </Box>
    );
};

export default AddOneMoreItem;
import { Box, Button } from '@chakra-ui/react';
import React from 'react';

const AddMoreItemBtn = ({ itemType = '', onClickCallback }) => {
    return (
        <Box>
            <Button
                variant={'ghost'}
                colorScheme={'teal'}
                onClick={() => onClickCallback()}
            >
                + Add one more {itemType}
            </Button>
        </Box>
    );
};

export default AddMoreItemBtn;
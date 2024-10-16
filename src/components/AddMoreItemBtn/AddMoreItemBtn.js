import { Box, Button } from '@chakra-ui/react';

const AddMoreItemBtn = ({ itemType = '', oneMore = false, onClickCallback }) => {
    return (
        <Box>
            <Button
                variant={'ghost'}
                colorScheme={'teal'}
                onClick={() => onClickCallback()}
            >
                + Add {oneMore && `one more`} {itemType}
            </Button>
        </Box>
    );
};

export default AddMoreItemBtn;
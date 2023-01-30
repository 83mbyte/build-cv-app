import { Box, Button } from '@chakra-ui/react';
import React from 'react';

const SaveButton = ({ saveToServer, buttonStatus }) => {
    return (
        <Box bg='transparent' textAlign={['center', 'right', 'right']} px={2}>
            <Button
                // _hover={{ backgroundColor: 'teal.300', color: 'white' }}
                colorScheme={'teal'} size={['xs', 'xs', 'sm']}
                margin={['8px auto 3px auto', '8px auto 3px auto', '15px auto 5px auto']}
                isLoading={buttonStatus == 'loading'}
                isDisabled={buttonStatus == 'disabled'}
                onClick={saveToServer}
            >
                Save Changes</Button>
        </Box>

    );
};

export default SaveButton;
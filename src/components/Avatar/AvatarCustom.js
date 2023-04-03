import React from 'react';
import { Box, Avatar, AvatarBadge } from '@chakra-ui/react';

const AvatarCustom = ({ name }) => {
    return (
        <Box>
            <Avatar size={'xs'} mx={0} name={name} bg={'purple.300'}>
                <AvatarBadge boxSize='1em' bg='teal.500' />
            </Avatar>
        </Box>

    );
};

export default AvatarCustom;
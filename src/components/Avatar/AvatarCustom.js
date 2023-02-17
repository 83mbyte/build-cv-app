import { Avatar, AvatarBadge, Box } from '@chakra-ui/react';
import React from 'react';
import ToolTip from '../ToolTip/ToolTip';

const AvatarCustom = ({ name, onClickHandler }) => {

    return (

        <Box onClick={onClickHandler} >
            <ToolTip label={`logged as ${name}`}>
                <Avatar size={'xs'} mx={0} name={name} bg={'purple.300'}>
                    <AvatarBadge boxSize='0.9em' bg='teal.500' />
                </Avatar>
            </ToolTip>
        </Box>
    );
};

export default AvatarCustom;
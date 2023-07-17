import { Box, Button, Text, HStack } from '@chakra-ui/react';
import React from 'react';
import ToolTip from '../Tooltip/ToolTip';
import { funcAPI } from '../../api/api';

const GenerateProposals = ({ jobTitle = null, onClickCallback }) => {

    const [loading, setLoading] = React.useState(false);

    const onClickHandler = async () => {

        setLoading(true);
        const data = await funcAPI.requestAI('generateSkills', jobTitle);
        if (data && data.content !== '') {
            setLoading(false);
            onClickCallback(data.content.split('|'));

        }
        setLoading(false);
    }

    if (jobTitle && jobTitle !== '') {

        return (
            <Box p={0} mx={0} my={1} w={'100%'} mb={2}>
                <HStack spacing={1} justifyContent={'space-between'} alignItems={'center'} h={'100%'}>
                    <Text mb={'10px'} fontSize={'xs'} color={'gray.500'} pt={'5px'} mt={0} >Also, you can use our ASSISTANT to generate a list of skills suitable for a '<span className='italic bold'>{jobTitle}</span>'.</Text>
                    <Box>
                        <ToolTip label='generate skills suggestions'>
                            <Button
                                size={['sm']}
                                colorScheme='teal'
                                variant={'outline'}
                                onClick={onClickHandler}
                                isLoading={loading}
                            >
                                Generate Skills
                            </Button>
                        </ToolTip>
                    </Box>
                </HStack >
            </Box >
        );
    } else {
        return null
    }
};

export default GenerateProposals;
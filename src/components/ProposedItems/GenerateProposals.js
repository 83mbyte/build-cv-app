import { Box, Button, Text, HStack } from '@chakra-ui/react';
import React from 'react';

import ToolTip from '@/components/ToolTip/ToolTip';
import { functionsAPI } from '@/lib/functionsAPI';
import { skillsData } from '@/lib/content-lib';

const GenerateProposals = ({ jobTitle = null, onClickCallback, accessToken }) => {

    const [loading, setLoading] = React.useState(false);

    const onClickHandler = async () => {

        setLoading(true);
        const data = await functionsAPI.requestAI('generateSkills', jobTitle, accessToken);

        if (data && data.status !== 'Success') {
            setLoading(false);
            onClickCallback({ status: 'Error', message: data.content });
        }
        if (data && data.status == 'Success' && data.content !== '') {
            setLoading(false);
            onClickCallback({ status: 'Success', data: data.content.split('|') });
        }

    }

    if (jobTitle && jobTitle !== '') {

        return (
            <Box p={0} mx={0} my={1} w={'100%'} mb={2}>
                <HStack spacing={1} justifyContent={'space-between'} alignItems={'center'} h={'100%'}>
                    <Text mb={'10px'} fontSize={'xs'} color={'gray.500'} pt={'5px'} mt={0} >{skillsData?.generateProposals || `Lorem ipsum dolor, sit amet consectetur adipisicing elit.`} <span style={{ fontStyle: 'italic', }}>{jobTitle}</span>.</Text>
                    <Box>
                        <ToolTip label='generate skills suggestions'>
                            <Button
                                size={'xs'}
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
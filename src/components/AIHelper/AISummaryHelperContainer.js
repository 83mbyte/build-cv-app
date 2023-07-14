import { Box, HStack, Text, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import ToolTip from '../Tooltip/ToolTip';
import { funcAPI } from '../../api/api';

const AISummaryHelperContainer = ({ data, callback }) => {

    const [loading, setLoading] = useState(false);

    const generateData = async (query, tokens = 200) => {

        try {
            setLoading(true);

            let data = await funcAPI.requestAI('summaryCreate', query);

            if (data && data.status === 200 && (data.content && data.content !== '')) {
                callback(data.content);
            }
            setLoading(true);

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }

    }


    const onClickHandler = () => {
        let skillsItems = '';
        let langItems = '';

        if (data.skills && data.skills.length > 0) {
            let tmpArr = data.skills.map(item => item.label).join(', ');
            skillsItems += tmpArr;
        }

        if (data.languages && data.languages.length > 0) {
            let tmpArr = data.languages.map(item => `${item.language}(${item.level})`).join(', ');
            langItems += tmpArr;
        }

        const createQuery = () => {
            let query = `Write a professional summary based on the following details: `;
            if (skillsItems !== '') {
                query += `My Skills - ${skillsItems}`;
            }
            if (langItems !== '') {
                query += `I speak - ${langItems}`;
            }
            return query;
        }
        generateData(createQuery())

    }
    return (
        <Box p={0} mx={0} my={1} w={'100%'} mb={2}>
            <HStack spacing={1} justifyContent={'space-between'} alignItems={'center'} h={'100%'}>
                <Text mb={'10px'} fontSize={'xs'} color={'gray.500'} pt={'5px'} mt={0} >Also, you can use our ASSISTANT to create a simple summary based on your data.</Text>
                <Box>
                    <ToolTip label='generate summary text'>
                        <Button isLoading={loading} isDisabled={!data.skills} size={'sm'} colorScheme='teal' variant={'outline'} onClick={() => onClickHandler()}>Auto Create</Button>
                    </ToolTip>
                </Box>
            </HStack >
        </Box >
    );
};

export default AISummaryHelperContainer;
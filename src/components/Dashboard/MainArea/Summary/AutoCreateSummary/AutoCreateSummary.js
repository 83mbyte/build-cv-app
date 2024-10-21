import React from 'react';
import { Box, HStack, Text, Button } from '@chakra-ui/react';

import ToolTip from '@/components/ToolTip/ToolTip';
import { useDispatch, useSelector } from 'react-redux';;
import { setIsLoadingAutoSummary } from '@/redux/features/summary/summarySlice';

import { MdOutlineAutoAwesome } from "react-icons/md";
import { functionsAPI } from '@/lib/functionsAPI';

const AutoCreateSummary = ({ accessToken, onChangeCallback }) => {
    const dispatch = useDispatch();

    const skillsData = useSelector(state => state.skills.data);
    const languageData = useSelector(state => state.languages.data);
    const loading = useSelector(state => state.summary.__serv.isLoading);

    const generateSummary = async (query) => {

        try {
            dispatch(setIsLoadingAutoSummary());
            let data = await functionsAPI.requestAI('summaryCreate', query, accessToken);

            if (data && data.status === 'Success' && (data.content && data.content !== '')) {

                onChangeCallback(data.content);
            }
            dispatch(setIsLoadingAutoSummary());
        } catch (error) {
            dispatch(setIsLoadingAutoSummary());
        }
    }

    const onClickHandler = () => {

        let skillsItems = '';
        let langItems = '';

        if (skillsData && skillsData.length > 0) {
            let skillsString = skillsData.map(item => item.label).join(', ');
            skillsItems += skillsString;
        }

        if (languageData && languageData.length > 0) {
            let langString = languageData.map(item => `${item.language}(${item.level})`).join(', ');
            langItems += langString;
        }

        const createQuery = () => {
            let query = `Write a professional summary based on the following details: `;
            if (skillsItems !== '') {
                query += `My Skills - ${skillsItems}${langItems !== '' ? ';' : '.'}`;
            }
            if (langItems !== '') {
                query += `${skillsItems && ' '}I speak - ${langItems}`;
            }

            return query;
        }
        generateSummary(createQuery())
    }

    return (
        <Box p={0} mx={0} my={1} w={'100%'} mb={2}>
            <HStack spacing={1} justifyContent={'space-between'} alignItems={'center'} h={'100%'}>
                <Text mb={'10px'} fontSize={'xs'} color={'gray.500'} pt={'5px'} mt={0} >Also, you can use our ASSISTANT to create a simple summary based on your data.</Text>
                <Box>
                    <ToolTip label={!skillsData ? 'add your skills to enable it' : 'auto create summary text'}>
                        <Button leftIcon={<MdOutlineAutoAwesome />} isLoading={loading} isDisabled={!skillsData} size={'xs'} colorScheme='teal' variant={'outline'} onClick={() => onClickHandler()}>Auto Create</Button>
                    </ToolTip>
                </Box>
            </HStack>
        </Box>
    );
};

export default AutoCreateSummary;
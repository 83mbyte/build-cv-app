import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import SectionDescription from '../../../Sections/SectionDescription';
import InputCustom from '../../../FormElements/InputCustom';

const QuizQuestion = ({ title, hint, inputName, inputValue, onChangeHandler }) => {
    return (

        <Box bg='' w='full' display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <Box bg=''>
                <Text fontSize={'lg'} textAlign={'center'} mb={1}>{title}</Text>
                {hint && <SectionDescription value={hint} />}
            </Box>
            <Box bg='' w='full' mt={1} mb={5}>
                <InputCustom name={inputName} inputValue={inputValue} onChangeCallback={(name, value) => onChangeHandler(name, value)} />
            </Box>

        </Box>
    );
};


export default QuizQuestion;
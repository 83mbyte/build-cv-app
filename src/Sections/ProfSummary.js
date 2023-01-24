import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import Wysiwyg from '../FormElements/WYSIWYG/Wysiwyg';
import SectionContainer from './SectionContainer';
import SectionDescription from './SectionDescription';

const ProfSummary = ({ title, state, user }) => {
    return (
        <SectionContainer headingTxt={title} type="flex" flexDirect='column'>
            <SectionDescription value={"Write 2-4 short & energetic sentences to interest the reader! Mention your role, experience & most importantly - your biggest achievements, best qualities and skills."} />
            <Wysiwyg state={state} user={user} />


        </SectionContainer>
    );
};

export default ProfSummary;
import React from 'react';
import SectionContainer from './SectionContainer';
import SectionDescription from './SectionDescription';

const Education = ({ title, state, user }) => {
    return (
        <SectionContainer headingTxt={title} type="flex" flexDirect='column'>
            <SectionDescription value={"A varied education on your resume sums up the value that your learnings and background will bring to job."} />



        </SectionContainer>
    );
};

export default Education;
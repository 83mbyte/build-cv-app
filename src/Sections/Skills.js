import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccordionContainer from '../components/Accordion/AccordionContainer';
import SpinnerCustom from '../components/Spinner/SpinnerCustom';
import { addNewSkillItem, fetchSkills, removeSkillItem } from '../redux/features/skills/skillsSlice';
import SectionContainer from './SectionContainer';
import SectionDescription from './SectionDescription';

const Skills = ({ title, user }) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.skills.data);
    const stateStatus = useSelector(state => state.skills.status);
    const error = useSelector(state => state.skills.error);

    let content;
    if (stateStatus === 'loading') {
        content = <SpinnerCustom />
    }
    else if ((stateStatus === 'succeeded' && data === undefined) || !data) {
        content = <Box>Something wrong - missed data.</Box>
    }
    else if (stateStatus === 'failed') {
        content = <Box>{error}</Box>
    }
    else if (stateStatus === 'succeeded' && data) {

        content = <AccordionContainer
            state={data}
            sectionName={'skills'}
            addOneMoreValue={'skill'}
            inputsOrder={['skill', 'level']}
            removeItemAction={removeSkillItem}
            addNewItemAction={addNewSkillItem}
        //valueUpdateAction={educationStateValueUpdate}
        />
    }

    useEffect(() => {
        if (stateStatus === 'idle') {
            dispatch(fetchSkills(user))
        }
    }, [stateStatus, dispatch, user])
    return (
        <SectionContainer headingTxt={title} type="flex" flexDirect='column'>
            <SectionDescription value={'Choose 5 of the most important skills to show your talents! Make sure they match the keywords of the job listing if applying via an online system.'} />
            {
                content
            }
        </SectionContainer>
    );
};

export default Skills;
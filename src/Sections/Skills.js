import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccordionContainer from '../components/Accordion/AccordionContainer';
import ChooseVariantBtnContainer from '../components/Buttons/ChooseVariantBtnContainer';
import Switcher from '../components/FormElements/Switcher';
import SpinnerCustom from '../components/Spinner/SpinnerCustom';
import { addNewSkillItem, fetchSkills, removeSkillItem, skillsStateValueUpdate, addNewSkillItemPredefined, skillLevelSwitchToggle } from '../redux/features/skills/skillsSlice';
import SectionContainer from './SectionContainer';
import SectionDescription from './SectionDescription';

const Skills = ({ title, user }) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.skills.data);
    const skillVars = useSelector(state => state.skills.skillVars);
    const isSwitchDisabled = useSelector(state => state.skills.isSwitchDisabled);
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
            valueUpdateAction={skillsStateValueUpdate}
            isSwitchDisabled={isSwitchDisabled}
        />
    }

    useEffect(() => {
        if (stateStatus === 'idle') {
            dispatch(fetchSkills(user))
        }
    }, [stateStatus, dispatch, user]);



    return (
        <SectionContainer headingTxt={title} type="flex" flexDirect='column'>
            <SectionDescription value={'Choose 5 of the most important skills to show your talents! Make sure they match the keywords of the job listing if applying via an online system.'} />

            <Box mt={5} mb={0} w={'100%'} px='10px' minW={'200px'}  >
                <Switcher
                    labelText={`Don't show experience level`}
                    switchId={'skill-level-switch'}
                    size={'sm'}
                    isChecked={isSwitchDisabled}
                    toggleSwitchAction={skillLevelSwitchToggle}
                />
            </Box>

            {skillVars && <ChooseVariantBtnContainer variants={skillVars} section={'skills'} addNewItemPredefined={addNewSkillItemPredefined} />}
            {
                content
            }
        </SectionContainer >
    );
};

export default Skills;
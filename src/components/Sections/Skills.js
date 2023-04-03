import { Accordion, Box, SimpleGrid, } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSkillsItem, getSkills, inputSkillsUpdate, removeSkillsItem, toggleSkillsSwitch } from '../../redux/features/skills/skillsSlice';
import { setIsModifiedContent } from '../../redux/features/utility/utilitySlice';
import AccordionElem from '../Accordion/AccordionElem';
import AddMoreItemBtn from '../AddMoreItemBtn/AddMoreItemBtn';
import InputCustom from '../FormElements/InputCustom';
import LevelSlider from '../LevelSlider/LevelSlider';
import LoadingSectionSkeleton from '../Progress/LoadingSectionSkeleton';
import ProposedItems from '../ProposedItems/ProposedItems';
import SwitchCustom from '../Switch/SwitchCustom';
import SectionWrapper from '../Wrappers/SectionWrapper';
import SectionDescription from './SectionDescription';
// TODO   check save link but not LEVEL
// TODO   check save link but not LEVEL
// TODO   check save link but not LEVEL
// TODO   check save link but not LEVEL
// TODO   check save link but not LEVEL
// TODO   check save link but not LEVEL
// TODO   check save link but not LEVEL
// TODO   check save link but not LEVEL
// TODO   check save link but not LEVEL
// TODO   check save link but not LEVEL
const Skills = ({ loggedUser }) => {
    const predefined = [
        { "label": "React", "level": 3 },
        { "label": "Python", "level": 3 },
        { "label": "C++", "level": 3 },
        { "label": "Java", "level": 3 },
        { "label": "JavaScript", "level": 3 },
        { "label": "QA", "level": 3 },
        { "label": "Docker", "level": 3 },
        { "label": "CSS", "level": 3 },
    ]

    let content;

    const dispatch = useDispatch();

    const data = useSelector(state => state.skills.data);
    const status = useSelector(state => state.skills.status);
    const error = useSelector(state => state.skills.error);
    const isSectionVisible = useSelector(state => state.skills.__serv.isSectionVisible);
    const isSwitchChecked = useSelector(state => state.skills.__serv.isSwitchChecked);

    const removeItem = (e, itemToRemove) => {
        e.preventDefault();
        let indexToRemove = data.findIndex((elem) => elem === itemToRemove);
        dispatch(removeSkillsItem(indexToRemove));
        dispatch(setIsModifiedContent({ status: true, section: 'skills' }));
    }

    const addItem = (data = null) => {
        if (!data) {
            dispatch(addSkillsItem());
        } else {
            dispatch(addSkillsItem(data))
        }
    }
    const toggleSwitch = () => {
        dispatch(toggleSkillsSwitch());
        dispatch(setIsModifiedContent({ status: true, section: 'skills' }));
    }

    const convertLevel = (val) => {
        switch (val) {
            case 1:
                return 'Novice';
            case 2:
                return 'Beginner'
            case 3:
                return 'Skillful'
            case 4:
                return 'Experienced'
            case 5:
                return 'Expert'
            default:
                return 'Skillful'
        }
    }
    const onChangeHandler = (index, name, value) => {
        dispatch(inputSkillsUpdate({ arrayIndex: index, inputName: name, value: value }));
        dispatch(setIsModifiedContent({ status: true, section: 'skills' }));
    }

    if (status === 'loading') {
        content = <LoadingSectionSkeleton rowsNumber={0} textArea={true} />
    }
    else if ((status === 'ready' && data === undefined) || !data) {
        content = <Box>Something wrong - missed data.</Box>
    }
    else if (status === 'failed') {
        content = <Box>{error}</Box>
    }
    else if (status === 'ready' && data) {
        content = isSectionVisible &&
            <SectionWrapper sectionTitle={'Skills'} flexDirect='column'>
                <SectionDescription value={'Provide 5 of the most important skills to show your talents! Make sure they match the keywords of the job listing if applying via an online system.'} />

                {
                    predefined.length > 0 &&
                    <ProposedItems sectionName={'skills'} predefined={predefined} onClickCallback={addItem} />
                }
                <Box my={2} mb={5} w={'100%'} px='0' minW={'200px'}  >
                    <SwitchCustom
                        size={'sm'}
                        labelText={`Don't show experience level.`}
                        isChecked={isSwitchChecked}
                        toggleSwitch={toggleSwitch}
                    />
                </Box>
                <Accordion allowToggle allowMultiple={false}>
                    {
                        data.map((elem, index) => {

                            return (
                                <AccordionElem
                                    title={elem.label}
                                    descr={!isSwitchChecked && convertLevel(elem.level)}
                                    removeItem={(e) => removeItem(e, data[index])}
                                    key={`skill_${index}`}
                                >
                                    <SimpleGrid columns={[1, 1, 2]} alignItems={'center'} justifyContent={'center'}>

                                        <InputCustom
                                            labelText={'Skill'}
                                            name={'label'}
                                            inputValue={elem.label}
                                            onChangeCallback={(name, value) => onChangeHandler(index, name, value)}
                                        />

                                        {
                                            !isSwitchChecked &&
                                            <LevelSlider
                                                defValue={elem.level ? elem.level : 3}
                                                levelLabel={convertLevel(elem.level)}
                                                onChangeCallback={(value) => onChangeHandler(index, 'level', value)}
                                                isDisabled={isSwitchChecked}
                                            />
                                        }
                                    </SimpleGrid>
                                </AccordionElem>
                            )
                        })
                    }
                </Accordion>
                <Box>
                    <AddMoreItemBtn itemType={'skill'} onClickCallback={addItem} />
                </Box>
            </SectionWrapper>
    }

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getSkills(loggedUser))
        }
    }, [status, loggedUser, dispatch])

    return (
        <>
            {content}
        </>
    );
};

export default Skills;
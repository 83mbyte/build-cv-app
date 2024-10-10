
import { useEffect } from 'react';
import { Accordion, Box, SimpleGrid } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { addSkillsItem, generateSkills, getSkills, inputSkillsUpdate, removeSkillsItem, setSkillsErrorMessage, toggleSkillsSwitch } from '@/redux/features/skills/skillsSlice';
import { setIsModifiedContent } from '@/redux/features/utility/utilitySlice';

import { skillsData } from '@/lib/content-lib';

import SectionWrapper from '../SectionsWrapper';
import SectionDescription from '../SectionDescription';
import LoadingSectionSkeleton from '@/components/Loaders/LoadingSectionSkeleton';
import SwitchCustom from '@/components/Switch/SwitchCustom';
import GenerateProposals from '../../../ProposedItems/GenerateProposals';
import ProposedItems from '../../../ProposedItems/ProposedItems';
import AccordionElem from '@/components/Accordion/AccordionElem';
import LevelSlider from '@/components/LevelSlider/LevelSlider';
import DashboardInput from '@/components/FormItems/DashboardInputs/DashboardInput';
import AddMoreItemBtn from '@/components/AddMoreItemBtn/AddMoreItemBtn';

const Skills = ({ userLogged }) => {
    // redux state data
    const dispatch = useDispatch();

    const jobTitle = useSelector(state => state.personDetails.data.jobTitle || null);

    const data = useSelector(state => state.skills.data);
    const status = useSelector(state => state.skills.status);
    const error = useSelector(state => state.skills.error);
    const isSectionVisible = useSelector(state => state.skills.__serv.isSectionVisible);
    const isSwitchChecked = useSelector(state => state.skills.__serv.isSwitchChecked);
    const predefined = useSelector(state => state.skills.__serv.predefined || null);


    // functions
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

    const onClickGenerateSkill = (dataObj) => {
        if (dataObj.status == 'Success') {

            let editedArray = dataObj.data.map(item => {
                return item.replace(/"/g, '')
            })

            dispatch(generateSkills({ role: jobTitle, value: editedArray }));
            dispatch(setIsModifiedContent({ status: true, section: 'skills' }));
        } else {

            dispatch(setSkillsErrorMessage({ message: dataObj.message }))
        }
    }
    const addItem = (data = null) => {
        if (!data) {
            dispatch(addSkillsItem());
        } else {
            dispatch(addSkillsItem(data))
        }
    }
    const removeItem = (e, itemToRemove) => {
        e.preventDefault();
        let indexToRemove = data.findIndex((elem) => elem === itemToRemove);
        dispatch(removeSkillsItem(indexToRemove));
        dispatch(setIsModifiedContent({ status: true, section: 'skills' }));
    }

    const toggleSwitch = () => {
        dispatch(toggleSkillsSwitch());
        dispatch(setIsModifiedContent({ status: true, section: 'skills' }));
    }


    // take a proper content to show
    let content = null;
    if (status === 'loading') {
        content = <LoadingSectionSkeleton rowsNumber={0} textArea={true} />
    }
    else if ((status === 'ready' && data === undefined) || !data) {
        content = <Box>Something wrong - Skills data is missed.</Box>
    }
    else if (status === 'failed') {

        content = <Box w='100%'>{error}</Box>
    }
    else if (status === 'ready' && data) {
        let predefinedRole = jobTitle ? jobTitle.toLowerCase().replace(/\s/g, '') : null;

        content =
            <>

                {/* button generate start*/}
                {
                    (!predefined || predefined[predefinedRole] === undefined) &&
                    <GenerateProposals jobTitle={jobTitle} onClickCallback={onClickGenerateSkill} accessToken={userLogged.accessToken} />

                    // TODO
                    // TODO  create alert in case of error
                    // TODO
                }
                {/* button generate end */}

                {
                    predefined && predefined[predefinedRole] !== undefined && predefined[predefinedRole].length > 0 &&
                    <ProposedItems sectionName={'skills'} predefined={
                        predefined[predefinedRole].map((item) => {
                            return { label: item, level: 3 }
                        })
                    } onClickCallback={addItem} />
                }

                {
                    // switch to show/hide experience level.
                    data.length > 0 &&
                    <Box my={2} mb={5} w={'100%'} px='0' minW={'200px'}>

                        <SwitchCustom
                            id={'skillsSwitch'}
                            size={'sm'}
                            labelText={`Don't show experience level.`}
                            isChecked={isSwitchChecked}
                            toggleSwitch={toggleSwitch}
                        />
                    </Box>
                }
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

                                        <DashboardInput
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
                    {
                        data.length > 0
                            ? <AddMoreItemBtn itemType={'skill'} onClickCallback={addItem} oneMore />
                            : <AddMoreItemBtn itemType={'skill'} onClickCallback={addItem} />
                    }
                </Box>
            </>
    }

    useEffect(() => {
        if (status === 'idle' && userLogged && isSectionVisible) {
            dispatch(getSkills(userLogged))
        }
    }, [status, userLogged, dispatch]);

    return (
        <>
            {
                isSectionVisible &&
                <SectionWrapper sectionTitle={'Skills'} flexDirect='column'>
                    <SectionDescription value={skillsData?.sectionDescription || `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum exercitationem commodi culpa, temporibus blanditiis adipisci optio, ad architecto vero quidem animi dignissimos debitis voluptas!`} />

                    {content}

                </SectionWrapper>
            }

        </>
    );
};

export default Skills;
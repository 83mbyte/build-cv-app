
import { VStack, Box, Stack, Text, HStack, } from '@chakra-ui/react';
import { motion } from 'motion/react';

import { useSelector, useDispatch } from 'react-redux';
import { addExpItem, removeExpItem, setExpItemData, setResumeExperienceHeading, setResumeExperienceIsVisible } from "@/redux/resume/experienceBlockSlice";
import { setShowAddRemoveButtons, setShowBlockControl } from '@/redux/settings/editorSettingsSlice';

import CustomText from '../dataFields/CustomText';
import CustomHeading from '../dataFields/CustomHeading';
import AddOrRemoveItem from '../addOrRemoveItem/AddOrRemoveItem';
import ExperienceAI from './aiBot/ExperienceAI';
import BlockControlContainer from '../blockControl/BlockControlContainer';


const ExperienceBlock = ({ editableFields }) => {
    const blockName = 'resumeExperience';

    const fontSize = useSelector(state => state.fontSettings.fontSize);
    const themeColor = useSelector(state => state.editorSettings.themeColor);
    const showBlockControl = useSelector(state => state.editorSettings.showBlockControl);

    const expHeading = useSelector(state => state.resumeExperience.expHeading);
    const expData = useSelector(state => state.resumeExperience.items);

    const dispatch = useDispatch();

    const onChangeHeadingHandler = (name, value,) => {
        dispatch(setResumeExperienceHeading({ name, value }));
    }


    return (
        <VStack bg='' alignItems={'flex-start'} w='full' padding={1} borderRadius={'lg'} gap={2}
            outlineStyle={'solid'}
            outlineColor={`${themeColor}.100`}
            outlineWidth={(showBlockControl.show && showBlockControl.blockName == 'resumeExperience') ? '1px' : '0px'}
            scrollbar={'hidden'}
            position={'relative'}
            onMouseEnter={() => dispatch(setShowBlockControl({ blockName, show: true }))}
            onMouseLeave={() => dispatch(setShowBlockControl({ blockName: null, show: false }))}
        >

            <CustomHeading
                variant={'h2'}
                size={fontSize.h2}
                fontWeight={'600'}
                defaultValue={'Experience'}
                name={'expHeading'}
                value={expHeading}
                isEditable={editableFields}
                onChangeCallback={(name, value) => onChangeHeadingHandler(name, value)}
            />

            <VStack width={'full'} gap={3} as={motion.div} layout bg=''>
                {
                    editableFields == true
                        ?
                        //return animated items
                        <>
                            {
                                expData.map((item, index) => {
                                    return (
                                        <ExperienceItemMotion fontSize={fontSize} themeColor={themeColor} data={item}
                                            dispatch={dispatch} editableFields={editableFields}
                                            key={item.id}
                                            initial={{ opacity: 0, }}
                                            animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.25 } }}
                                            exit={{ opacity: 0, transition: { delay: 0.1 } }}
                                            layout
                                        />
                                    )
                                })
                            }
                        </>

                        :
                        // return not animated
                        expData.map((item, index) => {
                            return (
                                <ExperienceItem fontSize={fontSize} themeColor={themeColor} data={item}
                                    key={`notAnimated_${item.id}`} dispatch={dispatch} editableFields={editableFields} />
                            )
                        })
                }
            </VStack>
            {
                (showBlockControl.show && showBlockControl.blockName == 'resumeExperience') &&
                <BlockControlContainer blockName={blockName} hideButtonAction={setResumeExperienceIsVisible} closeText={'Hide Experience block'}>
                    {/* add aditional controls here.. */}
                </BlockControlContainer>
            }
        </VStack>
    );
};

export default ExperienceBlock;


const ExperienceItem = ({ fontSize, themeColor, data, dispatch, editableFields, ref }) => {
    const show = useSelector(state => state.editorSettings.showAddRemoveButtons);

    let suffForIds = '';
    if (editableFields == false) {
        suffForIds = '_notAnimate';
    }

    const onChangeHandler = (id, name, value,) => {
        dispatch(setExpItemData({ id, name, value }));
    }

    return (
        <Box w='full'
            ref={ref}
            key={`li_${data.id}_${suffForIds}`}
            position={'relative'}
            padding={1}
            paddingLeft={2}
            display={'flex'}
            _hover={{ outlineStyle: 'dashed', outlineColor: `${themeColor}.200`, outlineWidth: '1px' }}
            borderRadius={'lg'}
            onMouseEnter={() => dispatch(setShowAddRemoveButtons({ id: data.id, show: true }))}
            onMouseLeave={() => dispatch(setShowAddRemoveButtons({ id: null, show: false }))}
        >
            <HStack bg='' w='full' alignItems={'flex-start'} gap={2} >
                <Text color={`${themeColor}.300`} dangerouslySetInnerHTML={{ __html: '&#9632' }} />
                <VStack alignItems={'flex-start'} w='full' >

                    <CustomHeading
                        variant={'h3'}
                        size={fontSize.h3}
                        fontWeight={'600'}
                        defaultValue={'Employer'}
                        name={'employer'}
                        value={data.employer}
                        isEditable={editableFields}
                        onChangeCallback={(name, value) => onChangeHandler(data.id, name, value)}
                    />
                    <Stack flexDirection={!editableFields ? 'row ' : ['column', 'row']} w='full'>
                        <Box flex={1} bg=''>
                            <CustomHeading
                                variant={'h4'}
                                size={fontSize.h3}
                                fontWeight={'600'}
                                defaultValue={'Position'}
                                name={'position'}
                                value={data.position}
                                isEditable={editableFields}
                                onChangeCallback={(name, value) => onChangeHandler(data.id, name, value)}
                            />
                        </Box>
                        <Box bg=''>
                            <CustomText
                                variant={'p'}
                                size={fontSize.p}
                                fontWeight={'400'}
                                defaultValue={'From - Until'}
                                name={'period'}
                                value={data.period}
                                isEditable={editableFields}
                                onChangeCallback={(name, value) => onChangeHandler(data.id, name, value)}
                            />
                        </Box>
                    </Stack>

                    <CustomText
                        variant={'p'}
                        size={fontSize.p}
                        fontWeight={'400'}
                        allowEnter={true}
                        defaultValue={'Provide your work experience description'}
                        name={'description'}
                        value={data.description}
                        isEditable={editableFields}
                        onChangeCallback={(name, value) => onChangeHandler(data.id, name, value)}
                    />

                </VStack>

            </HStack>
            {
                editableFields && (show.show && show.id == data.id) &&
                <motion.div
                    key={`motion_${data.id}_resumeExperience`}
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1, transition: { delay: 0.1 } }}
                    style={{ position: 'absolute', top: -10, right: '20px', display: 'block', }}
                >
                    <HStack>
                        <ExperienceAI currentId={data.id} />
                        <AddOrRemoveItem currentId={data.id} blockName={'resumeExperience'} actionAdd={addExpItem} actionRemove={removeExpItem} />
                    </HStack>
                </motion.div>
            }
        </Box>
    )
}


const ExperienceItemMotion = motion.create(ExperienceItem);

import { Box, Stack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { addSkillItem, removeSkillItem, setResumeSkillsHeading, setSkillItemData, setResumeSkillsIsVisible } from "@/redux/resume/skillsBlockSlice";
import { setShowAddRemoveButtons, setShowBlockControl } from '@/redux/settings/editorSettingsSlice';

import CustomText from '../dataFields/CustomText';
import CustomHeading from '../dataFields/CustomHeading';
import AddOrRemoveItem from "../addOrRemoveItem/AddOrRemoveItem";
import BlockControlContainer from '../blockControl/BlockControlContainer';

const SkillsBlock = ({ editableFields, layoutNumber }) => {
    const blockName = 'resumeSkills';

    const fontSize = useSelector(state => state.fontSettings.fontSize);
    const themeColor = useSelector(state => state.editorSettings.themeColor);
    const show = useSelector(state => state.editorSettings.showAddRemoveButtons);
    const showBlockControl = useSelector(state => state.editorSettings.showBlockControl);


    const skillsHeading = useSelector(state => state.resumeSkills.skillsHeading);
    const skillsItems = useSelector(state => state.resumeSkills.items)


    const dispatch = useDispatch();

    const onChangeHeadingHandler = (name, value,) => {
        dispatch(setResumeSkillsHeading({ name, value }));
    }

    const onChangeHandler = (id, value) => {
        dispatch(setSkillItemData({ id, value }));
    }


    return (
        <Stack
            bg=''
            w='full'
            flexDirection={'column'}
            gap={layoutNumber == 0 ? 2 : 4}
            justifyContent={layoutNumber == 0 && 'space-between'}
            outlineStyle={'solid'}
            outlineColor={`${themeColor}.100`}
            outlineWidth={(showBlockControl.show && showBlockControl.blockName == 'resumeSkills') ? '1px' : '0px'}
            padding={1} borderRadius={'lg'}
            position={'relative'}
            onMouseEnter={() => dispatch(setShowBlockControl({ blockName, show: true }))}
            onMouseLeave={() => dispatch(setShowBlockControl({ blockName: null, show: false }))}
        >

            <CustomHeading
                variant={'h2'}
                size={fontSize.h2}
                fontWeight={'600'}
                defaultValue={'Skills'}
                name={'skillsHeading'}
                value={skillsHeading}
                isEditable={editableFields}
                onChangeCallback={(name, value) => onChangeHeadingHandler(name, value)}
            />

            <Stack flexDirection={layoutNumber == 0 ? 'row' : 'column'} flexWrap={'wrap'} gap={2}>

                {
                    editableFields == true
                        ? // return  animated
                        <AnimatePresence>
                            {
                                skillsItems.map((item, index) => {

                                    return (
                                        <motion.div key={item.id}
                                            initial={{ opacity: 0, }}
                                            animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.25 } }}
                                            exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.3, delay: 0.1 } }}
                                            layout
                                            style={{ position: 'relative', backgroundColor: '', minWidth: '23%', margin: 0 }}
                                            onMouseEnter={() => dispatch(setShowAddRemoveButtons({ id: item.id, show: true }))}
                                            onMouseLeave={() => dispatch(setShowAddRemoveButtons({ id: null, show: false }))}
                                        >
                                            <CustomText
                                                variant={'p'}
                                                size={fontSize.p}
                                                fontWeight={'400'}
                                                defaultValue={'Enter skill'}
                                                name={null}
                                                value={item.value}
                                                isEditable={editableFields}
                                                onChangeCallback={(name, value) => onChangeHandler(item.id, value)}
                                            />

                                            {
                                                editableFields && (show.show && show.id == item.id) &&
                                                <motion.div
                                                    key={`motion_${item.id}_resumeSkills`}
                                                    initial={{ opacity: 0, }}
                                                    animate={{ opacity: 1, transition: { delay: 0.1 } }}
                                                    style={{ position: 'absolute', top: -10, right: '10px', display: 'block', }}
                                                >
                                                    <AddOrRemoveItem currentId={item.id} actionRemove={removeSkillItem} actionAdd={addSkillItem} sizeButtons={'15px'} />
                                                </motion.div>

                                            }
                                        </motion.div>
                                    )
                                })
                            }
                        </AnimatePresence>
                        :
                        // return not animated
                        skillsItems.map((item, index) => {

                            return (
                                <Box key={item.id}>
                                    <CustomText
                                        variant={'p'}
                                        size={fontSize.p}
                                        fontWeight={'400'}
                                        defaultValue={'Enter skill'}
                                        name={null}
                                        value={item.value}
                                        isEditable={editableFields}
                                        onChangeCallback={(name, value) => onChangeHandler(item.id, value)}
                                    />
                                </Box>
                            )
                        })
                }
            </Stack>
            {
                (showBlockControl.show && showBlockControl.blockName == 'resumeSkills') &&
                <BlockControlContainer blockName={blockName} hideButtonAction={setResumeSkillsIsVisible} closeText={'Hide Skills block'}>
                    {/* add aditional controls here.. */}
                </BlockControlContainer>
            }
        </Stack >

    );
};

export default SkillsBlock;


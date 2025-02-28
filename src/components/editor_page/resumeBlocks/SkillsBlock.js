import { Box, Button, Stack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'motion/react';

import { useSelector, useDispatch } from 'react-redux';
import { addSkillItem, removeSkillItem, setResumeSkillsHeading, setSkillItemData, setResumeSkillsIsVisible } from "@/redux/resume/skillsBlockSlice";
import { setShowAddRemoveButtons, setShowBlockControl, setShowModal } from '@/redux/settings/editorSettingsSlice';

import CustomText from '../dataFields/CustomText';
import CustomHeading from '../dataFields/CustomHeading';
import AddOrRemoveItem from "../addOrRemoveItem/AddOrRemoveItem";
import BlockControlContainer from '../blockControl/BlockControlContainer';

import { LuSparkles } from "react-icons/lu";

const SkillsBlock = ({ editableFields, layoutNumber }) => {
    const blockName = 'resumeSkills';

    const fontSize = useSelector(state => state.fontSettings.fontSize);
    const themeColor = useSelector(state => state.editorSettings.themeColor);
    const skillsHeading = useSelector(state => state.resumeSkills.skillsHeading);
    const skillsItems = useSelector(state => state.resumeSkills.items)

    const dispatch = useDispatch();

    const onChangeHeadingHandler = (name, value,) => {
        dispatch(setResumeSkillsHeading({ name, value }));
    }

    return (
        <SkillsBlockWrapper editableFields={editableFields} themeColor={themeColor} dispatch={dispatch} blockName={blockName}>

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

            <SkillsItemsWrapper layoutNumber={layoutNumber} editableFields={editableFields} >

                {
                    editableFields == true
                        ? // return animated 
                        <AnimatePresence initial={false}>
                            {
                                skillsItems.map((item) => {

                                    return (
                                        <SkillsItemMotion
                                            initial={{ opacity: 0, }}
                                            animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.25 } }}
                                            exit={{ opacity: 0, transition: { delay: 0.1 } }}
                                            layout
                                            item={item} key={item.id} fontSize={fontSize} dispatch={dispatch} editableFields={editableFields} />
                                    )
                                })
                            }
                        </AnimatePresence>
                        :
                        // return not animated
                        skillsItems.map((item) => {

                            return (
                                <SkillsItem item={item} key={`notAnimated_${item.id}`} fontSize={fontSize} dispatch={dispatch} editableFields={editableFields} />
                            )
                        })
                }

            </SkillsItemsWrapper>
        </SkillsBlockWrapper>
    );
};

export default SkillsBlock;


const SkillsBlockWrapper = ({ editableFields, blockName, themeColor, layoutNumber, dispatch, children }) => {

    const showBlockControl = useSelector(state => state.editorSettings.showBlockControl);

    if (editableFields) {
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
                {children}

                {
                    (showBlockControl.show && showBlockControl.blockName == 'resumeSkills') &&
                    <BlockControlContainer blockName={blockName} hideButtonAction={setResumeSkillsIsVisible} closeText={'Hide Skills block'}>
                        {/* add aditional controls here.. */}
                        <Button
                            aria-label="AI Assistant"
                            variant={'outline'}
                            bgColor={`white`}
                            borderWidth={'1px'}
                            borderColor={`${themeColor}.100`}
                            _hover={{ backgroundColor: `${themeColor}.50` }}
                            size={'xs'}
                            rounded={'md'}
                            px={1}
                            onClick={() => dispatch(setShowModal({ blockName, show: true }))}
                        ><LuSparkles />{'Ai Assistant' || `Click Me`}</Button>
                    </BlockControlContainer>
                }
            </Stack>
        )
    }
    else {
        // rednder to PDF
        return (
            <div style={{
                display: 'flex', flexDirection: 'column', width: '100%',
                padding: '0.25rem',
                borderRadius: '0.5rem',
                position: 'relative',
                justifyContent: layoutNumber == 0 && 'space-between',
                gap: layoutNumber == 0 ? '0.5rem' : '1rem'
            }}>
                {children}
            </div>
        )
    }
}

const SkillsItemsWrapper = ({ editableFields, layoutNumber, children }) => {
    if (editableFields) {
        return (
            <Stack flexDirection={layoutNumber == 0 ? 'row' : 'column'} flexWrap={'wrap'} gap={2}>
                {children}
            </Stack>
        )
    } else {
        // rednder to PDF
        return (
            <div style={{ display: 'flex', flexDirection: layoutNumber == 0 ? 'row' : 'column', flexWrap: 'wrap', gap: '0.5rem' }}>
                {children}

            </div >
        )
    }
}

const SkillsItem = ({ item, editableFields, fontSize, dispatch, ref }) => {
    let suffForIds = '';
    if (editableFields == false) {
        suffForIds = '_notAnimate';
    }
    const show = useSelector(state => state.editorSettings.showAddRemoveButtons);
    const onChangeHandler = (id, value) => {
        dispatch(setSkillItemData({ id, value }));
    }

    if (editableFields) {
        return (
            <Box key={`li_${item.id}_${suffForIds}`}
                ref={ref}
                margin={0}
                minWidth={'23%'}
                position='relative'
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
            </Box>
        )
    } else {
        return (
            // render to pdf
            <div style={{ minWidth: '23%', position: 'relative' }} >
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
            </div>
        )
    }
}

const SkillsItemMotion = motion.create(SkillsItem);
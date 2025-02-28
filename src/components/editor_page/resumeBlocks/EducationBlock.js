import { VStack, Box, Stack, HStack, Icon } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'motion/react';

import { useSelector, useDispatch } from 'react-redux';
import { addEducationItem, removeEducationItem, setEducationItemData, setResumeEducationHeading, setResumeEducationIsVisible } from '@/redux/resume/educationBlockSlice';
import { setShowAddRemoveButtons, setShowBlockControl } from '@/redux/settings/editorSettingsSlice';

import CustomHeading from '../dataFields/CustomHeading';
import CustomText from '../dataFields/CustomText';
import AddOrRemoveItem from '../addOrRemoveItem/AddOrRemoveItem';
import BlockControlContainer from '../blockControl/BlockControlContainer';

import { LuGraduationCap } from "react-icons/lu";
import { colorsPDF } from '@/lib/defaults';

const EducationBlock = ({ editableFields }) => {

    const blockName = 'resumeEducation';

    const fontSize = useSelector(state => state.fontSettings.fontSize);
    const themeColor = useSelector(state => state.editorSettings.themeColor);

    const educationHeading = useSelector(state => state.resumeEducation.educationHeading);
    const educationData = useSelector(state => state.resumeEducation.items);

    const dispatch = useDispatch();

    const onChangeHeadingHandler = (name, value,) => {
        dispatch(setResumeEducationHeading({ name, value }));
    }

    return (
        <EducationBlockWrapper editableFields={editableFields} themeColor={themeColor} dispatch={dispatch} blockName={blockName}>

            <CustomHeading
                variant={'h2'}
                size={fontSize.h2}
                fontWeight={'600'}
                defaultValue={'Education'}
                name={'educationHeading'}
                value={educationHeading}
                isEditable={editableFields}
                onChangeCallback={(name, value) => onChangeHeadingHandler(name, value)}
            />

            <EducationItemsWrapper editableFields={editableFields}>

                {
                    editableFields
                        ?
                        // return animated items
                        <AnimatePresence initial={false}>
                            {
                                educationData.map((item, index) => {
                                    return (

                                        <EducationItemMotion fontSize={fontSize} themeColor={themeColor} data={item}
                                            key={item.id}
                                            dispatch={dispatch} editableFields={editableFields}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.25 } }}
                                            exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.3, delay: 0.1 } }}
                                            layout
                                        />
                                    )
                                })
                            }
                        </AnimatePresence>

                        :
                        // return to use in PDF
                        educationData.map((item, index) => {
                            return (
                                <EducationItem fontSize={fontSize} themeColor={themeColor} data={item}
                                    key={`not_${item.id}`} dispatch={dispatch} editableFields={editableFields} />
                            )
                        })
                }

            </EducationItemsWrapper>
        </EducationBlockWrapper>
    )
};

export default EducationBlock;


const EducationBlockWrapper = ({ editableFields, themeColor, dispatch, blockName, children }) => {

    const showBlockControl = useSelector(state => state.editorSettings.showBlockControl);

    if (editableFields) {
        return (
            <VStack alignItems={'flex-start'} w='full' padding={1} borderRadius={'lg'} gap={2}

                scrollbar={'hidden'}
                outlineStyle={'solid'}
                outlineColor={`${themeColor}.100`}
                outlineWidth={(showBlockControl.show && showBlockControl.blockName == 'resumeEducation') ? '1px' : '0px'}
                position={'relative'}
                onMouseEnter={() => dispatch(setShowBlockControl({ blockName, show: true }))}
                onMouseLeave={() => dispatch(setShowBlockControl({ blockName: null, show: false }))}
            >
                {children}


                {
                    (showBlockControl.show && showBlockControl.blockName == 'resumeEducation') &&
                    <BlockControlContainer blockName={blockName} hideButtonAction={setResumeEducationIsVisible} closeText={'Hide Education block'}>
                        {/* add aditional controls here.. */}
                    </BlockControlContainer>
                }
            </VStack>
        );
    } else {
        // render to PDF
        return (
            <div style={{
                position: 'relative',
                width: '100%',
                display: 'flex', flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '0.5rem',
                padding: '0.25rem',
                borderRadius: '0.5rem',
            }}>
                {children}
            </div>
        )
    }

}

const EducationItemsWrapper = ({ editableFields, children }) => {

    if (editableFields) {
        return (
            <VStack width={'full'} gap={3} as={motion.div} layout bg=''  >
                {children}
            </VStack>
        )
    } else {
        // render to PDF
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
                {children}
            </div>
        )
    }
}

const EducationItem = ({ fontSize, themeColor, data, dispatch, editableFields, ref }) => {
    const show = useSelector(state => state.editorSettings.showAddRemoveButtons);

    const onChangeHandler = (id, name, value,) => {
        dispatch(setEducationItemData({ id, name, value }));
    }
    let suffForIds = '';
    if (editableFields == false) {
        suffForIds = '_notAnimate';
    }

    if (editableFields) {
        return (

            <Box w='full'
                ref={ref}
                key={`li_${data.id}_${suffForIds}`}
                position={'relative'}
                padding={1}
                paddingLeft={2}
                display={'flex'}
                flexDirection={'column'}
                _hover={{ outlineStyle: 'dashed', outlineColor: `${themeColor}.200`, outlineWidth: '1px' }}
                borderRadius={'lg'}
                onMouseEnter={() => dispatch(setShowAddRemoveButtons({ id: data.id, show: true }))}
                onMouseLeave={() => dispatch(setShowAddRemoveButtons({ id: null, show: false }))}

            >

                <Box display={'flex'} flexDirection={'row'} gap={2} width={'full'} >
                    <Box display={'flex'} paddingTop={1} >
                        <Icon color={`${themeColor}.300`} fontSize={fontSize.h3}  >
                            <LuGraduationCap />
                        </Icon>
                    </Box>
                    <VStack w='full'>
                        <CustomHeading
                            variant={'h3'}
                            size={fontSize.h3}
                            fontWeight={'600'}
                            defaultValue={'School/College/Univercity'}
                            name={'institution'}
                            value={data.institution}
                            isEditable={editableFields}
                            onChangeCallback={(name, value) => onChangeHandler(data.id, name, value)}
                        />
                        <Stack w='full' flexDirection={!editableFields ? 'row ' : ['column', 'row']} >
                            <Box flex={1} bg=''>
                                <CustomHeading
                                    variant={'h4'}
                                    size={fontSize.h3}
                                    fontWeight={'600'}
                                    defaultValue={'Degree'}
                                    name={'degree'}
                                    value={data.degree}
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
                    </VStack>
                </Box>

                {
                    (show.show && show.id == data.id) &&
                    <motion.div
                        key={`motion_${data.id}_resumeEducation`}
                        initial={{ opacity: 0, }}
                        animate={{ opacity: 1, transition: { delay: 0.1 } }}
                        style={{ position: 'absolute', top: -10, right: '20px', display: 'block', }}
                    >
                        <HStack>
                            <AddOrRemoveItem currentId={data.id} actionAdd={addEducationItem} actionRemove={removeEducationItem} />
                        </HStack>
                    </motion.div>
                }
            </Box >
        )
    }
    else {

        return (
            // render to pdf
            <div style={{ width: '100%', padding: '0.25rem', paddingLeft: '0.5rem', position: 'relative', borderRadius: '0.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '0.5rem', width: '100%' }}>
                    <div style={{ paddingTop: '0.125rem', display: 'flex' }}>
                        <Icon fontSize={fontSize.h3[1]} style={{ height: fontSize[1], color: colorsPDF[themeColor] }}
                        >
                            <LuGraduationCap />
                        </Icon>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>

                        <CustomHeading
                            variant={'h3'}
                            size={fontSize.h3}
                            fontWeight={'600'}
                            defaultValue={'School/College/Univercity'}
                            name={'institution'}
                            value={data.institution}
                            isEditable={editableFields}
                            onChangeCallback={(name, value) => onChangeHandler(data.id, name, value)}
                        />

                        <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', width: '100%', }}>
                            <div style={{ flex: 1, }}>

                                <CustomHeading
                                    variant={'h4'}
                                    size={fontSize.h3}
                                    fontWeight={'600'}
                                    defaultValue={'Degree'}
                                    name={'degree'}
                                    value={data.degree}
                                    isEditable={editableFields}
                                    onChangeCallback={(name, value) => onChangeHandler(data.id, name, value)}
                                />
                            </div>

                            <div>
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
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

const EducationItemMotion = motion.create(EducationItem)



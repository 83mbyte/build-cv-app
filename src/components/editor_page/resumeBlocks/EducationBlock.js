import { VStack, Box, Stack, Text, HStack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'motion/react';

import { useSelector, useDispatch } from 'react-redux';
import { addEducationItem, removeEducationItem, setEducationItemData, setResumeEducationHeading, } from '@/redux/resume/educationBlockSlice';


import { setShowAddRemoveButtons } from '@/redux/settings/editorSettingsSlice';
import CustomHeading from '../dataFields/CustomHeading';
import CustomText from '../dataFields/CustomText';
import AddOrRemoveItem from '../addOrRemoveItem/AddOrRemoveItem';


const EducationBlock = ({ editableFields }) => {

    const fontSize = useSelector(state => state.fontSettings.fontSize);
    const themeColor = useSelector(state => state.editorSettings.themeColor);

    const educationHeading = useSelector(state => state.resumeEducation.educationHeading);
    const educationData = useSelector(state => state.resumeEducation.items);

    const dispatch = useDispatch();

    const onChangeHeadingHandler = (name, value,) => {
        dispatch(setResumeEducationHeading({ name, value }));
    }

    return (
        <VStack bg='' alignItems={'flex-start'} w='full' padding={1} borderRadius={'lg'} gap={2} _hover={{ outlineStyle: 'solid', outlineColor: `${themeColor}.100`, outlineWidth: '1px' }} scrollbar={'hidden'}>

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

            <VStack width={'full'} gap={3} as={motion.div} layout bg=''  >
                {
                    editableFields == true
                        ?
                        // return animated items
                        <AnimatePresence>
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
                        // return not animated
                        educationData.map((item, index) => {
                            return (
                                <EducationItem fontSize={fontSize} themeColor={themeColor} data={item}
                                    key={`not_${item.id}`} dispatch={dispatch} editableFields={editableFields} />
                            )
                        })
                }
            </VStack>
        </VStack>
    );
};

export default EducationBlock;

const EducationItem = ({ fontSize, themeColor, data, dispatch, editableFields, ref }) => {

    const onChangeHandler = (id, name, value,) => {
        dispatch(setEducationItemData({ id, name, value }));
    }
    let suffForIds = '';
    if (editableFields == false) {
        suffForIds = '_notAnimate';
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
                        defaultValue={'School/College/Univercity'}
                        name={'institution'}
                        value={data.institution}
                        isEditable={editableFields}
                        onChangeCallback={(name, value) => onChangeHandler(data.id, name, value)}
                    />
                    <Stack flexDirection={!editableFields ? 'row ' : ['column', 'row']} w='full'>
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
            </HStack>

            {
                editableFields &&
                <AddOrRemoveItem currentId={data.id} blockName={'resumeEducation'} actionAdd={addEducationItem} actionRemove={removeEducationItem} />
            }
        </Box >
    )
}

const EducationItemMotion = motion.create(EducationItem)
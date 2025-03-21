
import { VStack, Box, Stack, HStack, IconButton, Icon } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'motion/react';
import { Tooltip } from '@/components/ui/tooltip';

import { useSelector, useDispatch } from 'react-redux';
import { addExpItem, removeExpItem, setExpItemData, setResumeExperienceHeading, setResumeExperienceIsVisible } from "@/redux/resume/experienceBlockSlice";
import { setShowAddRemoveButtons, setShowBlockControl, setShowModal } from '@/redux/settings/editorSettingsSlice';

import CustomText from '../dataFields/CustomText';
import CustomHeading from '../dataFields/CustomHeading';
import AddOrRemoveItem from '../addOrRemoveItem/AddOrRemoveItem';
import BlockControlContainer from '../blockControl/BlockControlContainer';

import { LuSparkles, LuCheck } from "react-icons/lu";
import { colorsPDF } from '@/lib/defaults';

const ExperienceBlock = ({ editableFields }) => {
    const blockName = 'resumeExperience';

    const fontSize = useSelector(state => state.fontSettings.fontSize);
    const themeColor = useSelector(state => state.editorSettings.themeColor);

    const expHeading = useSelector(state => state.resumeExperience.expHeading);
    const expData = useSelector(state => state.resumeExperience.items);

    const dispatch = useDispatch();

    const onChangeHeadingHandler = (name, value,) => {
        dispatch(setResumeExperienceHeading({ name, value }));
    }


    return (
        <ExperienceBlockWrapper editableFields={editableFields} themeColor={themeColor} dispatch={dispatch} blockName={blockName}>

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

            <ExperienceItemsWrapper editableFields={editableFields}>
                {
                    editableFields == true
                        ?
                        //return animated items
                        <AnimatePresence initial={false}>
                            {
                                expData.map((item) => {
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
                        </AnimatePresence>

                        :
                        // return not animated
                        expData.map((item) => {
                            return (
                                <ExperienceItem fontSize={fontSize} themeColor={themeColor} data={item}
                                    key={`notAnimated_${item.id}`} dispatch={dispatch} editableFields={editableFields} />
                            )
                        })
                }
            </ExperienceItemsWrapper>

        </ExperienceBlockWrapper>
    );
};

export default ExperienceBlock;


const ExperienceBlockWrapper = ({ editableFields, themeColor, dispatch, blockName, children }) => {
    const showBlockControl = useSelector(state => state.editorSettings.showBlockControl);

    if (editableFields) {
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
                {children}

                {
                    (showBlockControl.show && showBlockControl.blockName == 'resumeExperience') &&
                    <BlockControlContainer blockName={blockName} hideButtonAction={setResumeExperienceIsVisible} closeText={'Hide Experience block'}>
                        {/* add aditional controls here.. */}
                    </BlockControlContainer>
                }
            </VStack>
        )
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

const ExperienceItemsWrapper = ({ editableFields, children }) => {

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


const ExperienceItem = ({ fontSize, themeColor, data, dispatch, editableFields, ref }) => {
    const show = useSelector(state => state.editorSettings.showAddRemoveButtons);

    let suffForIds = '';
    if (editableFields == false) {
        suffForIds = '_notAnimate';
    }

    const onChangeHandler = (id, name, value,) => {
        dispatch(setExpItemData({ id, name, value }));
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
                _hover={{ outlineStyle: 'dashed', outlineColor: `${themeColor}.200`, outlineWidth: '1px' }}
                borderRadius={'lg'}
                onMouseEnter={() => dispatch(setShowAddRemoveButtons({ id: data.id, show: true }))}
                onMouseLeave={() => dispatch(setShowAddRemoveButtons({ id: null, show: false }))}
            >
                <Box display={'flex'} flexDirection={'row'} gap={2} width={'full'} >
                    <Box display={'flex'} paddingTop={1} >
                        <Icon color={`${themeColor}.300`} fontSize={fontSize.h3}  >
                            <LuCheck />
                        </Icon>
                    </Box>
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

                </Box>
                {
                    (show.show && show.id == data.id) &&
                    <motion.div
                        key={`motion_${data.id}_resumeExperience`}
                        initial={{ opacity: 0, }}
                        animate={{ opacity: 1, transition: { delay: 0.1 } }}
                        style={{ position: 'absolute', top: -10, right: '20px', display: 'block', }}
                    >
                        <HStack>
                            <Tooltip showArrow content="AI Assistant" openDelay={300} positioning={{ placement: 'top' }}>
                                <IconButton
                                    aria-label="AI Assistant"
                                    variant={'solid'}
                                    bgColor={`${themeColor}.500`}
                                    _hover={{ backgroundColor: `${themeColor}.300` }}
                                    size={'2xs'}
                                    rounded={'full'}
                                    onClick={() => dispatch(setShowModal({ blockName: 'resumeExperience', show: true, id: data.id }))}
                                ><LuSparkles /></IconButton>
                            </Tooltip>
                            <AddOrRemoveItem currentId={data.id} blockName={'resumeExperience'} actionAdd={addExpItem} actionRemove={removeExpItem} />
                        </HStack>
                    </motion.div>
                }
            </Box>
        )
    } else {

        return (
            // render to pdf
            <div style={{ width: '100%', padding: '0.25rem', position: 'relative', borderRadius: '0.5rem', boxSizing: 'border-box' }}>

                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '0.5rem', flex: 1, paddingLeft: '0.5rem' }}>

                    <div style={{ paddingTop: '0.125rem', display: 'flex' }}>
                        <Icon fontSize={fontSize.h3[1]} style={{ height: fontSize[1], color: colorsPDF[themeColor] }}
                        >
                            <LuCheck />
                        </Icon>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>

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

                        <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', width: '100%', }}>
                            <div style={{ flex: 1, }}>
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
                    </div>

                </div>
            </div>
        )
    }


}


const ExperienceItemMotion = motion.create(ExperienceItem);

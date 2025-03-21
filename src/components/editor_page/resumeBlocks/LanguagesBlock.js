import { Box, Stack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'motion/react';

import { useSelector, useDispatch } from 'react-redux';
import { addLanguagesItem, removeLanguagesItem, setLanguagesItemData, setResumeLanguagesHeading, setResumeLanguagesIsVisible } from '@/redux/resume/languagesBlockSlice';
import { setShowAddRemoveButtons, setShowBlockControl } from '@/redux/settings/editorSettingsSlice';

import CustomHeading from '../dataFields/CustomHeading';
import CustomText from '../dataFields/CustomText';
import AddOrRemoveItem from '../addOrRemoveItem/AddOrRemoveItem';
import BlockControlContainer from '../blockControl/BlockControlContainer';


const LanguagesBlock = ({ editableFields, layoutNumber }) => {
    const blockName = 'resumeLanguages';

    const fontSize = useSelector(state => state.fontSettings.fontSize);
    const themeColor = useSelector(state => state.editorSettings.themeColor);

    const languagesHeading = useSelector(state => state.resumeLanguages.languagesHeading);
    const languagesItems = useSelector(state => state.resumeLanguages.items);

    const dispatch = useDispatch();

    const onChangeHeadingHandler = (name, value,) => {
        dispatch(setResumeLanguagesHeading({ name, value }));
    }


    return (
        <LanguagesBlockWrapper editableFields={editableFields} themeColor={themeColor} dispatch={dispatch} blockName={blockName}>

            <CustomHeading
                variant={'h2'}
                size={fontSize.h2}
                fontWeight={'600'}
                defaultValue={'Languages'}
                name={'languagesHeading'}
                value={languagesHeading}
                isEditable={editableFields}
                onChangeCallback={(name, value) => onChangeHeadingHandler(name, value)}
            />

            <LanguagesItemsWrapper layoutNumber={layoutNumber} editableFields={editableFields}>

                {
                    editableFields == true
                        ? // return  animated
                        <AnimatePresence initial={false}>
                            {
                                languagesItems.map((item, index) => {

                                    return (
                                        <LanguagesItemMotion
                                            initial={{ opacity: 0, }}
                                            animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.25 } }}
                                            exit={{ opacity: 0, transition: { delay: 0.1 } }}
                                            layout
                                            item={item} key={item.id} fontSize={fontSize} dispatch={dispatch} editableFields={editableFields}
                                        />
                                    )
                                })
                            }
                        </AnimatePresence>
                        :
                        // return not animated
                        languagesItems.map((item, index) => {
                            return (
                                <LanguagesItem key={`notAnimated_${item.id}`} item={item} fontSize={fontSize} dispatch={dispatch} editableFields={editableFields} />
                            )
                        })
                }
            </LanguagesItemsWrapper>
        </LanguagesBlockWrapper>
    );
};

export default LanguagesBlock;

const LanguagesBlockWrapper = ({ editableFields, blockName, themeColor, layoutNumber, dispatch, children }) => {
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
                outlineWidth={(showBlockControl.show && showBlockControl.blockName == 'resumeLanguages') ? '1px' : '0px'}
                padding={1} borderRadius={'lg'}
                position={'relative'}
                onMouseEnter={() => dispatch(setShowBlockControl({ blockName, show: true }))}
                onMouseLeave={() => dispatch(setShowBlockControl({ blockName: null, show: false }))}
            >
                {children}

                {
                    (showBlockControl.show && showBlockControl.blockName == 'resumeLanguages') &&
                    <BlockControlContainer blockName={blockName} hideButtonAction={setResumeLanguagesIsVisible} closeText={'Hide Languages block'}>
                        {/* add aditional controls here.. */}
                    </BlockControlContainer>
                }
            </Stack>
        )
    } else {
        // render to PDF
        return (
            <div style={{
                display: 'flex', flexDirection: 'column', width: '100%',
                padding: '0.25rem',
                borderRadius: '0.5rem',
                position: 'relative',
                boxSizing: 'border-box',
                justifyContent: layoutNumber == 0 && 'space-between',
                gap: layoutNumber == 0 ? '0.5rem' : '1rem'
            }}>
                {children}
            </div>
        )
    }
}
const LanguagesItemsWrapper = ({ editableFields, layoutNumber, children }) => {
    if (editableFields) {
        return (
            <Stack flexDirection={layoutNumber == 0 ? 'row' : 'column'} flexWrap={'wrap'} gap={2} px={2}>
                {children}
            </Stack>
        )
    } else {
        // render to PDF
        return (
            <div style={{ display: 'flex', flexDirection: layoutNumber == 0 ? 'row' : 'column', flexWrap: 'wrap', gap: '0.5rem', paddingInline: '0.5rem' }}>
                {children}

            </div >
        )
    }
}

const LanguagesItem = ({ item, editableFields, fontSize, dispatch, ref }) => {

    let suffForIds = '';
    if (editableFields == false) {
        suffForIds = '_notAnimate';
    }

    const show = useSelector(state => state.editorSettings.showAddRemoveButtons);

    const onChangeHandler = (id, value) => {
        dispatch(setLanguagesItemData({ id, value }));
    }

    if (editableFields) {
        return (
            <Box key={`li_${item.id}_${suffForIds}`}
                ref={ref}
                margin={0}
                minWidth={'23%'}
                position='relative'
                px={'1'}
                borderRadius={'xs'}
                backgroundColor={'#fafafa'}
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
                        key={`motion_${item.id}_resumeLanguages`}
                        initial={{ opacity: 0, }}
                        animate={{ opacity: 1, transition: { delay: 0.1 } }}
                        style={{ position: 'absolute', top: -10, right: '10px', display: 'block', }}
                    >

                        <AddOrRemoveItem currentId={item.id} actionRemove={removeLanguagesItem} actionAdd={addLanguagesItem} marginRight={'10px'} sizeButtons={'15px'} />
                    </motion.div>
                }
            </Box>
        )
    }
    else {
        return (
            // render to pdf
            <div style={{ minWidth: '23%', position: 'relative', backgroundColor: '#fafafa', paddingInline: '0.125rem', borderRadius: '0.125rem' }} >
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

const LanguagesItemMotion = motion.create(LanguagesItem);
import { Box, Stack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'motion/react';

import { useSelector, useDispatch } from 'react-redux';
import { addLanguagesItem, removeLanguagesItem, setLanguagesItemData, setResumeLanguagesHeading } from '@/redux/resume/languagesBlockSlice';
import { setShowAddRemoveButtons } from '@/redux/settings/editorSettingsSlice';
import CustomHeading from '../dataFields/CustomHeading';
import CustomText from '../dataFields/CustomText';
import AddOrRemoveItem from '../addOrRemoveItem/AddOrRemoveItem';



const LanguagesBlock = ({ editableFields, layoutNumber }) => {
    const fontSize = useSelector(state => state.fontSettings.fontSize);
    const themeColor = useSelector(state => state.editorSettings.themeColor);

    const languagesHeading = useSelector(state => state.resumeLanguages.languagesHeading);
    const languagesItems = useSelector(state => state.resumeLanguages.items)
    const dispatch = useDispatch();

    const onChangeHeadingHandler = (name, value,) => {
        dispatch(setResumeLanguagesHeading({ name, value }));
    }

    const onChangeHandler = (id, value) => {
        dispatch(setLanguagesItemData({ id, value }));
    }


    return (
        <Stack
            bg=''
            w='full'
            flexDirection={'column'}
            gap={layoutNumber == 0 ? 2 : 4}
            justifyContent={layoutNumber == 0 && 'space-between'}
            _hover={{ outlineStyle: 'solid', outlineColor: `${themeColor}.100`, outlineWidth: '1px' }}
            padding={1} borderRadius={'lg'}
        >

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

            <Stack flexDirection={layoutNumber == 0 ? 'row' : 'column'} flexWrap={'wrap'} gap={2}>

                {
                    editableFields == true
                        ? // return  animated
                        <AnimatePresence>
                            {
                                languagesItems.map((item, index) => {

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
                                                editableFields &&
                                                <AddOrRemoveItem currentId={item.id} blockName={'resumeLanguages'} actionRemove={removeLanguagesItem} actionAdd={addLanguagesItem} marginRight={'10px'} sizeButtons={'15px'} />
                                            }
                                        </motion.div>
                                    )
                                })
                            }
                        </AnimatePresence>
                        :
                        // return not animated
                        languagesItems.map((item, index) => {

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

        </Stack >
    );
};

export default LanguagesBlock;


import { useRef } from 'react';
import { VStack, Text, Box, Input, Button, HStack, Icon, StackSeparator } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { AnimatePresence, motion } from 'motion/react';

import { useSelector, useDispatch } from 'react-redux';

import { sanitizeInput } from '@/lib/commonScripts';
import { skillsBotData } from '@/lib/content-lib';

import { LuSparkles, LuSquare, LuSquareCheck } from "react-icons/lu";
import { setSkillsGeneratedItems, addSkillsSelectedItems, removeSkillsSelectedItems, useSkillsSelecteditems } from '@/redux/resume/skillsBlockSlice';
import { setResumeHeaderData } from '@/redux/resume/headerBlockSlice';
import { setShowModal } from '@/redux/settings/editorSettingsSlice';


const SkillsAI = ({ blockName }) => {

    const positionField = useRef(null);

    const dispatch = useDispatch();
    const themeColor = useSelector(state => state.editorSettings.themeColor);
    const position = useSelector(state => state.resumeHeader.position);

    const generatedItems = useSelector(state => state.resumeSkills.assistant.generatedItems);
    const selectedItems = useSelector(state => state.resumeSkills.assistant.selectedItems);


    const onChangeHandler = (value) => {
        const cleanValue = sanitizeInput(value);
        dispatch(setResumeHeaderData({ name: 'position', value: cleanValue }));

    }

    const clickToGenerate = (currentId) => {
        // call a cloud function to work with AI
        // await for the function reply with generatedData to dispatch it 
        const tempData = ['BC', 37399, 'LOREM IPSUM', '2BC', 372399, 'LOREM1 IPSUM'];

        dispatch(setSkillsGeneratedItems({ value: tempData }));
    }

    const clickToSelectItem = (isSelectedIndex, item) => {

        if (isSelectedIndex == -1) {
            dispatch(addSkillsSelectedItems({ value: item }));
        } else {
            dispatch(removeSkillsSelectedItems({ value: item }))
        }
    }

    const clickUseItButton = () => {
        dispatch(useSkillsSelecteditems());
        dispatch(setShowModal({ show: false }));
    }

    const clickCancelButton = () => {
        dispatch(setShowModal({ show: false }))
    }
    return (

        <VStack position={'relative'}>
            <Text>{skillsBotData.heading}</Text>
            <VStack w='full'>
                <Text bg='' w='full' textAlign={'left'} fontSize={'sm'}>{skillsBotData.description ?? 'lorem ipsum lorem ipsum'}</Text>
                <Box w={'full'}>

                    <Field label={skillsBotData.positionLabel} required>
                        <Input
                            size={'xs'}
                            borderWidth={'1px'}
                            borderColor={`${themeColor}.200`}
                            borderStyle={'solid'}
                            borderRadius={'lg'}
                            ref={positionField}
                            placeholder={skillsBotData.positionField ?? 'lorem ipsum'}
                            defaultValue={position ?? null}
                            _focusVisible={{ outline: 'none' }}
                            onChange={() => onChangeHandler(positionField.current.value)}
                        />
                    </Field>
                </Box>
            </VStack>

            <AnimatePresence>
                {
                    (generatedItems && generatedItems.length > 0) &&
                    <motion.div
                        key={`motion_${blockName}`}
                        style={{ width: '100%', overflow: 'hidden' }}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: '130px', opacity: 1, transition: { opacity: { delay: 0.3 } } }}
                        exit={{ height: 0, opacity: 0 }}
                        viewport={{ once: true }}
                    >
                        <Box padding={2} w='full' minHeight={'50px'}
                            height={'130px'}
                            borderWidth={'1px'}
                            borderColor={`${themeColor}.200`}
                            borderStyle={'solid'}
                            borderRadius={'lg'}
                            bg=''
                            overflow={'scroll'}
                        >
                            <VStack width='full' bg='' overflow={'scroll'} gap={3} separator={<StackSeparator />}>
                                {
                                    generatedItems.map((item, index) => {
                                        let isSelectedIndex = -1;
                                        if (selectedItems) {
                                            isSelectedIndex = selectedItems.findIndex(itemToCheck => itemToCheck == item);
                                        }

                                        return (
                                            <Box width={'full'} cursor={'pointer'}
                                                fontSize={'xs'}
                                                borderWidth={'0px'}
                                                _hover={{ opacity: 0.5 }}
                                                userSelect={'none'}
                                                key={index}
                                                py={1}
                                                onClick={() => clickToSelectItem(isSelectedIndex, item)}
                                            >
                                                <HStack>
                                                    <Icon color={isSelectedIndex != -1 ? `${themeColor}` : 'lightgrey'}>
                                                        {/* <Icon color={'lightgrey'}> */}

                                                        {isSelectedIndex != -1
                                                            ? <LuSquareCheck />
                                                            : <LuSquare />
                                                        }
                                                    </Icon>
                                                    {item}
                                                </HStack>
                                            </Box>
                                        )
                                    })
                                }
                            </VStack>
                        </Box>
                    </motion.div>
                }
            </AnimatePresence>

            <VStack gap={2} w='full' marginTop={2}>
                {/* <Button size='xs' w={'full'} colorPalette={themeColor} onClick={clickToGenerate} disabled={(!position || position.length < 3)}> <LuSparkles />Generate</Button> */}
                {
                    (!generatedItems)
                        ? <Button size='xs' w={'full'} colorPalette={themeColor} onClick={clickToGenerate} disabled={(!position || position.length < 3)}> <LuSparkles />Generate</Button>
                        : <>

                            <Button size='xs' w={'full'}
                                colorPalette={themeColor}
                                disabled={(!selectedItems || selectedItems.length < 1)}
                                onClick={() => clickUseItButton()}
                            >Use selected</Button>
                            <Button size='2xs' w={'full'} colorPalette={themeColor} variant={'ghost'} onClick={clickCancelButton}>cancel</Button>

                        </>

                }
            </VStack>


        </VStack>
    );
};

export default SkillsAI;
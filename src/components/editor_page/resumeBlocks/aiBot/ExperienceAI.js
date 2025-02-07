import { useRef } from 'react';
import { VStack, Text, Box, Input, Button } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'motion/react';

import { useSelector, useDispatch } from 'react-redux';
import { setExperienceRole, setExperienceGeneratedItems, setShowModalAiBotContainer, addExperienceSelectedItems, removeExperienceSelectedItems } from '@/redux/modals/resumeAiBotSlice';

import { experienceBotData } from '@/lib/content-lib';
import { sanitizeInput } from '@/lib/commonScripts';
import { LuSparkles } from "react-icons/lu";

import ModalAiContainer from './ModalAiContainer';
import { setExpItemData } from '@/redux/resume/experienceBlockSlice';

const ExperienceAI = ({ currentId, fieldName = 'description' }) => {

    const themeColor = useSelector(state => state.editorSettings.themeColor);
    const position = useSelector(state => state.resumeAiBot.resumeExperience.position);
    const generatedItems = useSelector(state => state.resumeAiBot.resumeExperience.generatedItems);
    const selectedItems = useSelector(state => state.resumeAiBot.resumeExperience.selectedItems);
    const dispatch = useDispatch();

    const positionField = useRef(null);

    const onChangeHandler = (currentId, value,) => {
        const cleanValue = sanitizeInput(value);
        dispatch(setExperienceRole({ currentId, value: cleanValue }));
    }

    const clickToGenerate = (currentId) => {
        // call a cloud function to work with AI
        // await for the function reply with generatedData to dispatch it 
        const tempData = ['BC', 37399, 'LOREM IPSUM', '2BC', 372399, 'LOREM1 IPSUM'];

        dispatch(setExperienceGeneratedItems({ currentId, value: tempData }));
        dispatch(setExperienceRole({ currentId, value: null }));
    }

    const clickUseItButton = (id, fieldName) => {

        // create a string that will be used in appropriate resume's block
        let stringToSave = '';
        if (selectedItems[id].length > 0) {
            if (selectedItems[id].length > 1) {
                selectedItems[id].map((item, index) => {
                    if (index != selectedItems[id].length - 1) {
                        stringToSave += `- ${item}</br>`
                    } else {
                        stringToSave += `- ${item}`
                    }
                })
            } else {
                stringToSave += `${selectedItems[currentId][0]}`;
            }
        }

        // add data to the resume block
        dispatch(setExpItemData({ id: currentId, name: fieldName, value: stringToSave }));

        dispatch(setShowModalAiBotContainer({ id: null, show: false }));
    }
    const clickCancelButton = () => {
        dispatch(setShowModalAiBotContainer({ id: null, show: false }))
    }

    const clickToSelectItem = (isSelectedIndex, item) => {

        if (isSelectedIndex == -1) {
            dispatch(addExperienceSelectedItems({ currentId, value: item }));
        } else {
            dispatch(removeExperienceSelectedItems({ currentId, value: item }))
        }
    }

    return (
        <ModalAiContainer title={'AI Bot'}>

            <VStack position={'relative'}  >
                <Text>Work Experience</Text>
                {(!generatedItems || (generatedItems && !generatedItems[currentId])) &&
                    <VStack>
                        <Text bg='' w='full' textAlign={'left'} fontSize={'sm'}>{experienceBotData.description ?? 'lorem ipsum lorem ipsum'}</Text>
                        <Box w='full'>
                            <Input
                                size={'xs'}
                                borderWidth={'1px'}
                                borderColor={`${themeColor}.200`}
                                borderStyle={'solid'}
                                borderRadius={'lg'}
                                ref={positionField}
                                placeholder={experienceBotData.positionField ?? 'lorem ipsum'}
                                defaultValue={position ?? null}
                                _focusVisible={{ outline: 'none' }}
                                onChange={() => onChangeHandler(currentId, positionField.current.value)}
                            />
                        </Box>
                    </VStack>
                }

                <AnimatePresence>
                    {
                        (generatedItems && (generatedItems[currentId] && generatedItems[currentId].length > 0)) &&
                        <motion.div
                            key={'generatedDataDiv'}
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
                                <VStack width='full' bg='' overflow={'scroll'}>
                                    {
                                        generatedItems[currentId].map((item, index) => {
                                            let isSelectedIndex = -1;
                                            if (selectedItems && selectedItems[currentId]) {
                                                isSelectedIndex = selectedItems[currentId].findIndex(itemToCheck => itemToCheck == item);
                                            }

                                            return (
                                                <Box borderWidth={'1px'} width={'full'} cursor={'pointer'}
                                                    userSelect={'none'}
                                                    key={index}
                                                    backgroundColor={isSelectedIndex != -1 ? 'lightgray' : ''}
                                                    onClick={() => clickToSelectItem(isSelectedIndex, item)}
                                                >{index + 1}. {item}</Box>
                                            )
                                        })
                                    }
                                </VStack>
                            </Box>
                        </motion.div>
                    }
                </AnimatePresence>

                <VStack gap={2} w='full' marginTop={2}>
                    {
                        (!generatedItems || !generatedItems[currentId])
                            ? <Button size='xs' w={'full'} colorPalette={themeColor} onClick={() => clickToGenerate(currentId)} disabled={(!position || position.length < 3)}> <LuSparkles />Generate</Button>

                            :
                            <>
                                <Button size='xs' w={'full'}
                                    colorPalette={themeColor} onClick={() => clickUseItButton(currentId, fieldName)}
                                    disabled={(
                                        !selectedItems || !selectedItems[currentId] || selectedItems[currentId].length < 1
                                    )}
                                >Use selected</Button>
                                <Button size='2xs' w={'full'} colorPalette={themeColor} variant={'ghost'} onClick={clickCancelButton}>cancel</Button>
                            </>
                    }
                </VStack>

            </VStack>
        </ModalAiContainer>
    );
};

export default ExperienceAI;
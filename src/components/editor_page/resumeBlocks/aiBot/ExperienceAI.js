import { useRef } from 'react';
import { VStack, Text, Box, Input, Button, HStack, Icon } from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';
import { Field } from '@/components/ui/field';
import { AnimatePresence, motion } from 'motion/react';

import { useSelector, useDispatch } from 'react-redux';
import { addExperienceSelectedItems, clearExpAssistantData, removeExperienceSelectedItems, setExpAssistantStatus, setExpItemData, setExperienceGeneratedItems, setExperiencePositionForAssistant } from '@/redux/resume/experienceBlockSlice';
import { setShowModal } from '@/redux/settings/editorSettingsSlice';

import { cookieHandler } from '@/lib/cookies';
import { aiWindowButtons, experienceBotData } from '@/lib/content-lib';
import { getDataFromFunctionsEndpoint, sanitizeInput } from '@/lib/commonScripts';
import { LuSparkles, LuSquare, LuSquareCheck } from "react-icons/lu";


const ExperienceAI = ({ fieldName = 'description' }) => {
    const currentId = useSelector(state => state.editorSettings.showModal.id);
    const themeColor = useSelector(state => state.editorSettings.themeColor);

    const userLogged = useSelector(state => state.auth.data);
    const accessToken = userLogged?.accessToken ?? null;
    const position = useSelector(state => state.resumeExperience.assistant.position);
    const generatedItems = useSelector(state => state.resumeExperience.assistant.generatedItems);
    const selectedItems = useSelector(state => state.resumeExperience.assistant.selectedItems);

    const status = useSelector(state => state.resumeExperience.assistant.status);

    const dispatch = useDispatch();

    const positionField = useRef(null);

    const onChangeHandler = (currentId, value,) => {
        const cleanValue = sanitizeInput(value);
        dispatch(setExperiencePositionForAssistant({ currentId, value: cleanValue }));
    }

    const clickToGenerate = async (currentId) => {
        // call a cloud function to work with AI
        // await for the function reply with generatedData to dispatch it 

        try {

            dispatch(setExpAssistantStatus('loading'));
            if (!accessToken) {
                // as free user use

                let value = await cookieHandler('experience');
                if (value > 3) {
                    throw new Error('You reached the allowed requests daily limit.');
                }
            }

            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: position, variant: 'generateExp' }),
            };
            const res = await getDataFromFunctionsEndpoint('generateData', options);
            if (!res) {
                throw new Error('No server response');
            }

            const generatedExp = await res.json();
            if (generatedExp?.status == 'Success') {
                const data = generatedExp.content.split('|');
                dispatch(setExperienceGeneratedItems({ currentId, value: data }));
                dispatch(setExperiencePositionForAssistant({ currentId, value: null }));
            }
            dispatch(setExpAssistantStatus('fulfilled'));

        } catch (error) {
            dispatch(setExpAssistantStatus('idle'));
            toaster.create({
                title: 'Error',
                description: error.message ? error.message : experienceBotData.assistantErrors.generateExperienceyDefault ?? 'lorem ipsum',
                type: 'error',
                duration: 5000
            })
        }


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
        dispatch(setShowModal({ show: false }));
    }


    const clickToSelectItem = (isSelectedIndex, item) => {

        if (isSelectedIndex == -1) {
            dispatch(addExperienceSelectedItems({ currentId, value: item }));
        }
        else {
            dispatch(removeExperienceSelectedItems({ currentId, value: item }));
        }
    }

    const clickNewButton = () => {
        dispatch(clearExpAssistantData());
    }
    const clickCancelButton = () => {
        dispatch(setShowModal({ show: false }));
    }


    return (

        <VStack position={'relative'}  >
            <Text>{experienceBotData.heading ?? 'Work Experience'}</Text>
            {(!generatedItems || (generatedItems && !generatedItems[currentId])) &&
                <VStack>
                    <Text bg='' w='full' textAlign={'left'} fontSize={'sm'}>{experienceBotData.description ?? 'lorem ipsum lorem ipsum'}</Text>
                    <Box w='full'>
                        <Field required label={experienceBotData.positionLabel ?? 'Lorem ipsum'}>
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
                        </Field>
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
                            <VStack width='full' bg='' overflow={'scroll'} gap={3}>
                                {
                                    generatedItems[currentId].map((item, index) => {
                                        let isSelectedIndex = -1;

                                        if (selectedItems && selectedItems[currentId]) {
                                            isSelectedIndex = selectedItems[currentId].findIndex(itemToCheck => itemToCheck == item);
                                        }

                                        return (
                                            <Box width={'full'} cursor={'pointer'}
                                                borderWidth={'0px'}
                                                fontSize={'sm'}
                                                _hover={{ opacity: 0.5 }}
                                                borderStyle={isSelectedIndex != -1 ? 'solid' : 'dashed'}
                                                borderBottomWidth={'1px'}
                                                userSelect={'none'}
                                                key={index}
                                                onClick={() => clickToSelectItem(isSelectedIndex, item)}
                                            >
                                                <HStack>
                                                    <Icon color={isSelectedIndex != -1 ? `${themeColor}` : 'lightgrey'}>
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
                {
                    (!generatedItems || !generatedItems[currentId])
                        ? <Button size='xs' w={'full'} colorPalette={themeColor} onClick={() => clickToGenerate(currentId)} disabled={(!position || position.length < 3)}> <LuSparkles />{aiWindowButtons.generate ?? 'lorem ipsum'}</Button>


                        :
                        <>
                            <Button size='xs' w={'full'}
                                colorPalette={themeColor} onClick={() => clickUseItButton(currentId, fieldName)}
                                disabled={(
                                    !selectedItems || !selectedItems[currentId] || selectedItems[currentId].length < 1
                                )}
                            >{aiWindowButtons.use ?? 'lorem ipsum'}</Button>
                            <Button size='2xs' w={'full'} colorPalette={themeColor} variant={'ghost'} onClick={clickNewButton}>{aiWindowButtons.new ?? 'lorem ipsum'}</Button>
                            <Button size='2xs' w={'full'} colorPalette={themeColor} variant={'ghost'} onClick={clickCancelButton}>{aiWindowButtons.cancel ?? 'lorem ipsum'}</Button>
                        </>
                }
            </VStack>
        </VStack>
    );
};

export default ExperienceAI;
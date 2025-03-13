import { useRef } from 'react';
import { VStack, Text, Box, Input, Button, HStack, Icon, StackSeparator } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { toaster } from "@/components/ui/toaster";
import { AnimatePresence, motion } from 'motion/react';

import { useSelector, useDispatch } from 'react-redux';
import { setSkillsGeneratedItems, addSkillsSelectedItems, removeSkillsSelectedItems, useSkillsSelecteditems, setSkillsStatus } from '@/redux/resume/skillsBlockSlice';
import { setResumeHeaderData } from '@/redux/resume/headerBlockSlice';
import { setShowModal } from '@/redux/settings/editorSettingsSlice';

import { sanitizeInput } from '@/lib/commonScripts';
import { aiWindowButtons, skillsBotData } from '@/lib/content-lib';
import { LuSparkles, LuSquare, LuSquareCheck } from "react-icons/lu";


const SkillsAI = ({ blockName }) => {

    const positionField = useRef(null);

    const dispatch = useDispatch();
    const themeColor = useSelector(state => state.editorSettings.themeColor);
    const position = useSelector(state => state.resumeHeader.position);

    const generatedItems = useSelector(state => state.resumeSkills.assistant.generatedItems);
    const selectedItems = useSelector(state => state.resumeSkills.assistant.selectedItems);
    const status = useSelector(state => state.resumeSkills.assistant.status);


    const onChangeHandler = (value) => {
        const cleanValue = sanitizeInput(value);
        dispatch(setResumeHeaderData({ name: 'position', value: cleanValue }));
    }

    const clickToGenerate = async () => {
        // call a cloud function to work with AI
        // await for the function reply with generatedData to dispatch it 

        dispatch(setSkillsStatus('loading'));

        try {

            let genertateSkillsReply = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/generateSkills`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ query: position }),
                });

            const genertatedSkills = await genertateSkillsReply.json();

            if (genertatedSkills?.status == 'Success') {
                const data = genertatedSkills.content.split('|');
                dispatch(setSkillsGeneratedItems({ value: data }));
                dispatch(setSkillsStatus('fulfilled'));
            } else {
                throw new Error(genertatedSkills?.message ? genertatedSkills.message : skillsBotData.assistantErrors.generateSkills);
            }


        } catch (error) {
            console.error(error.message ? error.message : skillsBotData.assistantErrors.generateSkillsDefault ?? 'lorem ipsum ');
            toaster.create({
                title: 'Error',
                description: error.message ? error.message : skillsBotData.assistantErrors.generateSkillsDefault ?? 'lorem ipsum',
                type: 'error',
                duration: 5000
            })
            dispatch(setSkillsStatus('idle'));
        }
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
                <Text bg='' w='full' textAlign={'left'} fontSize={'sm'}>{skillsBotData.description ?? 'lorem ipsum'}</Text>
                <Box w={'full'}>

                    <Field label={skillsBotData.positionLabel} required>
                        <Input
                            size={'xs'}
                            borderWidth={'1px'}
                            borderColor={`${themeColor}.200`}
                            borderStyle={'solid'}
                            borderRadius={'lg'}
                            disabled={status == 'fulfilled'}
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
                            <VStack width='full' bg='' overflow={'scroll'} gap={3} separator={<StackSeparator />}  >
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
                    (!generatedItems)
                        ? <Button size='xs' w={'full'} colorPalette={themeColor} onClick={clickToGenerate} disabled={(!position || position.length < 3)} loading={status == 'loading'}> <LuSparkles />{aiWindowButtons.generate ?? 'lorem ipsum'}</Button>
                        : <>
                            <Button size='xs' w={'full'}
                                colorPalette={themeColor}
                                disabled={(!selectedItems || selectedItems.length < 1)}
                                onClick={() => clickUseItButton()}
                            >{aiWindowButtons.use ?? 'lorem ipsum'}</Button>
                            <Button size='2xs' w={'full'} colorPalette={themeColor} variant={'ghost'} onClick={clickCancelButton}>{aiWindowButtons.cancel ?? 'lorem ipsum'}</Button>
                        </>
                }
            </VStack>
        </VStack>
    );
};

export default SkillsAI;